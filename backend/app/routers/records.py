from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from fastapi.responses import FileResponse
from app.models import Summary, SummaryFilter
from app.utils import CurrentUser, cleanup_file, parse_summaryjson
from typing import Annotated
from app.db import SessionDep
from faster_whisper import WhisperModel, tokenizer
import io
from langchain_ollama import OllamaLLM
from pydub import AudioSegment
from pydantic import FilePath
from uuid import uuid4
import os
import re
from sqlmodel import Field, Session, SQLModel, create_engine, select
import math
from fastapi_filter import FilterDepends
from zipfile import ZipFile
from fpdf import FPDF
from docx import Document
from app.email_funcs import send_email
from pydantic.networks import EmailStr
from starlette.background import BackgroundTask, BackgroundTasks
import wget
from omegaconf import OmegaConf
import json
import shutil
import torch
import torchaudio
from nemo.collections.asr.models.msdd_models import NeuralDiarizer, ClusteringDiarizer
from deepmultilingualpunctuation import PunctuationModel
import re
import logging
import nltk
import faster_whisper

from ctc_forced_aligner import (
    load_alignment_model,
    generate_emissions,
    preprocess_text,
    get_alignments,
    get_spans,
    postprocess_results,
)

from app.diarization_funcs import (
    create_config,
    get_realigned_ws_mapping_with_punctuation,
    get_sentences_speaker_mapping,
    get_speaker_aware_transcript,
    get_words_speaker_mapping,
    langs_to_iso,
    punct_model_langs,
)

from app.settings import settings

#Llama модель
model = OllamaLLM(model=settings.llm_model, format="json", base_url="http://127.0.0.1:11434/")
json_response = """
{
  text: "Краткое содержание текста",
  topic: "Тема текста",
  start: "Время начала текста",
  end: "Время конца текста",
  speakers: 
    [
      {
        speaker_name: "Имя спикера в формате Speaker 0",
        speaker_info: "Резюме речи спикера",
      },
    ],
}
"""

router = APIRouter()

#Запрос для распознования спикеров
@router.post("/record/diarize")
async def record_diarize( file: UploadFile, session: SessionDep, title: str, current_user: CurrentUser):
    #Конвертируем аудио/видео в wav
    audio = AudioSegment.from_file(io.BytesIO(file.file.read()))
    audio_id = str(uuid4())
    audio_dir = "app/sounds/" + audio_id + "/"
    if not os.path.exists(audio_dir):
        os.mkdir(audio_dir)
    file_name = audio_dir + "audio.wav"
    audio.export(file_name, format="wav")
    device = "cuda" if torch.cuda.is_available() else "cpu" #Cuda если есть
    #Используем виспер
    model_whisper = WhisperModel(settings.whisper_model, device=settings.whisper_device, compute_type=settings.whisper_compute) #Whsiper модель
    whisper_pipeline = faster_whisper.BatchedInferencePipeline(model_whisper) #Пайплайн для виспера
    vocal_target = file_name #Аудио
    audio_waveform = faster_whisper.decode_audio(vocal_target)
    #Транскрипция
    batch_size = 8 #Можно в переменную!!!
    if batch_size > 0:
        transcript_segments, info = whisper_pipeline.transcribe( audio_waveform, batch_size=batch_size, without_timestamps=True,)
    else:
        transcript_segments, info = model_whisper.transcribe( audio_waveform, without_timestamps=True, vad_filter=True,)
    full_transcript = "".join(segment.text for segment in transcript_segments) #Полная транскрипция
    del model_whisper, whisper_pipeline #Очищаем память
    ####
    #Выравниваем новое аудио с оригинальным
    ####
    alignment_model, alignment_tokenizer = load_alignment_model( device, dtype=torch.float16 if device == "cuda" else torch.float32, )
    audio_waveform = ( torch.from_numpy(audio_waveform).to(alignment_model.dtype).to(alignment_model.device) )
    emissions, stride = generate_emissions( alignment_model, audio_waveform, batch_size=batch_size )
    del alignment_model
    #torch.cuda.empty_cache()
    tokens_starred, text_starred = preprocess_text( full_transcript, romanize=True, language=langs_to_iso[info.language], )
    segments, scores, blank_token = get_alignments( emissions, tokens_starred, alignment_tokenizer, )
    spans = get_spans(tokens_starred, segments, blank_token)
    word_timestamps = postprocess_results(text_starred, spans, stride, scores)
    #Конвертируем в моно для nemo
    ROOT = os.getcwd()
    temp_path = os.path.join(ROOT, "temp_outputs")
    os.makedirs(temp_path, exist_ok=True)
    torchaudio.save( os.path.join(temp_path, "mono_file.wav"), audio_waveform.cpu().unsqueeze(0).float(),
        16000, channels_first=True, )
    #Диаризация
    if (settings.diarize_type=="Neural"):
        msdd_model = NeuralDiarizer(cfg=create_config(temp_path))
    elif (settings.diarize_type=="Clustering"):
        msdd_model = ClusteringDiarizer(cfg=create_config(temp_path))
    msdd_model.diarize()
    del msdd_model
    #torch.cuda.empty_cache()
    #Сопоставляем спикеров с предложениями
    speaker_ts = []
    with open(os.path.join(temp_path, "pred_rttms", "mono_file.rttm"), "r") as f:
        lines = f.readlines()
        for line in lines:
            line_list = line.split(" ")
            s = int(float(line_list[5]) * 1000)
            e = s + int(float(line_list[8]) * 1000)
            speaker_ts.append([s, e, int(line_list[11].split("_")[-1])])
    wsm = get_words_speaker_mapping(word_timestamps, speaker_ts, "start")
    #Пунктуация
    if info.language in punct_model_langs:
        punct_model = PunctuationModel(model="kredor/punctuate-all")
        words_list = list(map(lambda x: x["word"], wsm))
        labled_words = punct_model.predict(words_list, chunk_size=230)
        ending_puncts = ".?!"
        model_puncts = ".,;:!?"
        # We don't want to punctuate U.S.A. with a period. Right?
        is_acronym = lambda x: re.fullmatch(r"\b(?:[a-zA-Z]\.){2,}", x)
        for word_dict, labeled_tuple in zip(wsm, labled_words):
            word = word_dict["word"]
            if (
                word
                and labeled_tuple[1] in ending_puncts
                and (word[-1] not in model_puncts or is_acronym(word))
            ):
                word += labeled_tuple[1]
                if word.endswith(".."):
                    word = word.rstrip(".")
                word_dict["word"] = word

    else:
        logging.warning( f"Punctuation restoration is not available for {info.language} language. Using the original punctuation.")

    wsm = get_realigned_ws_mapping_with_punctuation(wsm)
    ssm = get_sentences_speaker_mapping(wsm, speaker_ts)
    text = get_speaker_aware_transcript(ssm)
    summary_common = model.invoke(f"Дай краткое содержание текста - {text}. Определи тему. Определи время начала и конца текста. Зафиксируй разных спикеров (в формате Speaker 0 без определения настоящего имени) и резюме речи каждого (без повторений).  Ответь ТОЛЬКО в формате json: {json_response}")
    db_summary = Summary(text=f"{summary_common}", title = title, user_id = current_user.id, audio_id = audio_id)
    session.add(db_summary)
    session.commit()
    session.refresh(db_summary)
    send_email(current_user.email, db_summary.id)
    return db_summary

@router.get("/records")
async def read_records(session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=20)] = 20):
    """
    Function to get 20 summaries. Функция для для получения 20 (или меньше) резюме.
    """
    records = session.exec(select(Summary).offset(offset).limit(limit)).all()
    return records

@router.get("/summary/{summary_id}/")
async def get_summary_record(session: SessionDep, summary_id: int):
    """
    Function to get one summary. Функция для получения одного резюме.
    """
    summary_db = session.get(Summary, summary_id)
    if not summary_db:
        raise HTTPException(status_code=404, detail="Summary not found")
    return summary_db

@router.delete("/delete_record/{summary_id}/")
async def delete_summary_record(session: SessionDep, summary_id: int):
    """
    Function to delete both summary and record. Функция для удаления текста и аудио.
    """
    summary_db = session.get(Summary, summary_id)
    if not summary_db:
        raise HTTPException(status_code=404, detail="Record not found")
    audio_id = summary_db.audio_id
    os.remove("app/sounds/" + audio_id + "/audio.wav")
    session.delete(summary_db)
    session.commit()
    return HTTPException(status_code=204, detail="Audio record and summary are deleted")

@router.delete("/delete_audio/{summary_id}/")
async def delete_audio(session: SessionDep, summary_id: int):
    """
    Function to delete only audio Функция для удаления только аудио.
    """
    summary_db = session.get(Summary, summary_id)
    if not summary_db:
        raise HTTPException(status_code=404, detail="Record not found")
    audio_id = summary_db.audio_id
    os.remove("app/sounds/" + audio_id + "/audio.wav")
    return HTTPException(status_code=204, detail="Audio record is deleted")

@router.put("/summary/edit")
async def edit_summary_text(session: SessionDep, text_input: str, topic_input: str, summary_id: int):
    """
    Function to edit text of summary. Функция для редактирования только текста в резюме.
    """
    summary_db = session.get(Summary, summary_id)
    old_data = summary_db.text
    dict_data = json.loads(old_data)
    dict_data["text"] = text_input
    dict_data["topic"] = topic_input
    summary_db.text = json.dumps(dict_data, ensure_ascii=False)
    session.add(summary_db)
    session.commit()
    session.refresh(summary_db)
    return summary_db

@router.put("/summary/edit_full")
async def edit_full(session: SessionDep, summary_id: int, new_json_text: str):
    summary_db = session.get(Summary, summary_id)
    summary_db.text = new_json_text
    session.add(summary_db)
    session.commit()
    session.refresh(summary_db)
    return summary_db

@router.get("/summary_filter/")
async def filter_summary(session: SessionDep, summary_filter: SummaryFilter = FilterDepends(SummaryFilter), 
        page: int = Query(ge=0, default=0), size: int = Query(ge=1, le=100)):
    #Пагинация
    offset_min = page * size
    offset_max = (page + 1) * size
    #Сам фильтр
    query = select(Summary)
    query = summary_filter.filter(query)
    query = summary_filter.sort(query)
    result = session.execute(query).scalars().all()
    response = result[offset_min:offset_max] + [ {"page": page, "size": size, "total": math.ceil(len(result)/size)-1} ]
    return response

@router.get("/record/archive")
async def archive_record(session: SessionDep, summary_id: int):
    """
    Function to archive audio. Функция для архивации аудио.
    """
    summary_db = session.get(Summary, summary_id)
    if not summary_db:
        raise HTTPException(status_code=404, detail="Record not found")
    audio_id = summary_db.audio_id
    audio_filename = "app/sounds/" + audio_id + "/audio.wav"
    zipfile_name = "app/sounds/" + audio_id + "/audio.zip"
    #audio_file = open(audio_filename, 'r')
    with ZipFile(f"{zipfile_name}", 'w') as zip:
        zip.write(audio_filename, "audio.wav")
    #audio_file.close()
    os.remove(f"{audio_filename}") #Удаляем аудио
    return HTTPException(status_code=204, detail="Audio record is archived")

@router.get("/audio/{audio_id}")
async def get_audio(audio_id: str):
    """
    Function to get one audio. Функция для получения одного аудио.
    """
    path_audio_dir = "app/sounds/" + audio_id + "/audio.wav"
    return FileResponse(path_audio_dir)

#@router.post("/email")
#async def send_email_req(email_to: EmailStr):
#    send_email(email_to)
#    return {"result": "something?"}

@router.get("/summary_download_txt")
async def create_txt_summary(session: SessionDep, summary_id: int, background_tasks: BackgroundTasks):
    """
    Get summary as .txt file. Получение резюме в формате .txt файла.
    """
    summary_db = session.get(Summary, summary_id)
    new_text = f"{summary_db.title}" + "\n" + "\n"
    new_text = parse_summaryjson(summary_db.text, new_text)
    filename = f"app/texts/summary_{summary_db.id}.txt"
    f = open(filename, "w")
    f.write(new_text)
    f.close()
    background_tasks.add_task(os.remove, filename)
    return FileResponse(path=filename, filename="summary.txt", media_type='multipart/form-data')

@router.get("/summary_download_pdf")
async def create_pdf_summary(session: SessionDep, summary_id: int, background_tasks: BackgroundTasks):
    """
    Get summary as pdf file. Получение резюме в формате pdf файла.
    """
    summary_db = session.get(Summary, summary_id)
    new_text = f"{summary_db.title}" + "\n" + "\n"
    new_text = parse_summaryjson(summary_db.text, new_text)
    pdf = FPDF()
    pdf.add_page()
    pdf.add_font('DejaVuSans', '', 'app/fonts/DejaVuSans.ttf')
    pdf.set_font('DejaVuSans', size=14)
    pdf.write(text=new_text)
    filename_pdf = f"app/texts/summary_{summary_db.id}.pdf"
    pdf.output(filename_pdf)
    background_tasks.add_task(os.remove, filename_pdf)
    return FileResponse(path=filename_pdf, filename="summary.pdf", media_type='multipart/form-data')

@router.get("/summary_download_docx")
async def create_docx_summary(session:SessionDep, summary_id:int, background_tasks: BackgroundTasks):
    """
    Get summary as docx file. Получение резюме в формате docx файла.
    """
    #background=BackgroundTask(os.remove(filename_docx))
    summary_db = session.get(Summary, summary_id)
    new_text = f"{summary_db.title}" + "\n" + "\n"
    new_text = parse_summaryjson(summary_db.text, new_text)
    document = Document()
    document.add_paragraph(text=new_text)
    filename_docx = f"app/texts/summary_{summary_db.id}.docx"
    document.save(filename_docx)
    background_tasks.add_task(os.remove, filename_docx)
    return FileResponse(path=filename_docx, filename="summary.docx", media_type='multipart/form-data')
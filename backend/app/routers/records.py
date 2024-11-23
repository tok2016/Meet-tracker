from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from .ollama_functions import OllamaFunctions
from fastapi.responses import FileResponse
from app.models import Summary, SummaryFilter
from app.utils import CurrentUser
from typing import Annotated
from app.db import SessionDep
from faster_whisper import WhisperModel, tokenizer
import io
from langchain_ollama import OllamaLLM
from pydub import AudioSegment
from app.utils import diarize_text
from app.hf_token import auth_token_hf
from pyannote.audio import Pipeline
from pyannote.core import Segment, Annotation, Timeline
from pydantic import FilePath
from uuid import uuid4
import os
import re
from sqlmodel import Field, Session, SQLModel, create_engine, select
import math
from fastapi_filter import FilterDepends
from zipfile import ZipFile
from app.email_funcs import send_email
from pydantic.networks import EmailStr
import torch

#Whsiper модель
model_size = "large-v3"
model_whisper = WhisperModel(model_size, device="cpu", compute_type="int8")
#Llama модель
model = OllamaFunctions(model="llama3.1", format="json", base_url="http://127.0.0.1:11434/")
model = model.bind_tools(
    tools=[
        {
            "name": "summarize_text",
            "description": "Summarize text",
            "parameters": {
                "type": "object",
                "properties": {
                    "topic": {
                        "type": "string",
                        "description": "Topic of the text",
                    },
                    "text": {
                        "type": "string",
                        "description": "Short summary of the text",
                    },
                    "start": {
                        "type": "string",
                        "description": "Time when first segment starts",
                    },
                    "end": {
                        "type": "string",
                        "description": "Time when last segment ends",
                    },
                    "speakers": {
                        "type": "array",
                        #"description": "Speakers with names and their tasks"
                        "items": {
                            "type": "object",
                            "properties": {
                                "speaker_name": {
                                    "type": "string",
                                    "description": "Name of the speaker",
                                },
                                "speaker_info": {
                                    "type": "string",
                                    "description": "Short summary of the speaker's speech",
                                },
                            },
                        },
                    },
                },
                "required": ["topic", "text", "start", "end", "speakers"],
            },
        }
    ],
    function_call={"name": "summarize_text"},
)

router = APIRouter()

#Запрос для распознования спикеров
@router.post("/record/diarize")
async def record_diarize( file: UploadFile, session: SessionDep, title: str, current_user: CurrentUser):
    audio = AudioSegment.from_file(io.BytesIO(file.file.read()))
    audio_id = str(uuid4())
    audio_dir = "app/sounds/" + audio_id + "/"
    if not os.path.exists(audio_dir):
        os.mkdir(audio_dir)
    file_name = audio_dir + "audio.wav"
    audio.export(file_name, format="wav")
    segments, info = model_whisper.transcribe(file_name, beam_size=5)
    pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=auth_token_hf)
    torch.backends.cuda.matmul.allow_tf32 = False
    torch.backends.cudnn.allow_tf32 = False 
    pipeline.to(torch.device("cuda"))
    diarization_results = pipeline(file_name)
    final_results = diarize_text(segments, diarization_results)
    lines = ""
    for seg, spk, sent in final_results:
        line = f'Start: {seg.start} End: {seg.end} Speaker: {spk} Sentence: {sent}'
        lines += f"{line}   "
    summary_common = model.invoke(f"Give short summary of the text {lines}. Determine the topic of the text. Determine when it starts and ends. List speakers with names")
    #Расскоментить эту строку если не хочется работать с лламой и виспером
    #summary_common = "content='' additional_kwargs={} response_metadata={} id='run-7a6c305b-38d7-4f81-91bd-5bff5e646b01-0' tool_calls=[{'name': 'summarize_text', 'args': {'topic': 'Conversation between family members', 'text': 'The conversation is about a person who is feeling down and their loved ones trying to comfort them.', 'start': '0.0', 'end': '20.14', 'speakers': 'SPEAKER_02, SPEAKER_00, SPEAKER_03'}, 'id': 'call_6c90d255c518452d800fc54711d70a74', 'type': 'tool_call'}]"
    db_summary = Summary(text=f"{summary_common}", title = title, user_id = current_user.id, audio_id = audio_id)
    session.add(db_summary)
    session.commit()
    session.refresh(db_summary)

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
async def edit_summary_text(session: SessionDep, text_input: str, summary_id: int):
    """
    Function to edit text of summary. Функция для редактирования только текста в резюме.
    """
    summary_db = session.get(Summary, summary_id)
    old_data = summary_db.text
    #new_data = re.sub(r"'text': '(.*?)', 'start'", old_data, "new_text")
    new_text = re.sub(r"(?<='text': ').+?(?=', 'start')", text_input, old_data)
    summary_db.text = new_text
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

@router.post("/email")
async def send_email_req(email_to: EmailStr):
    send_email(email_to)
    return {"result": "something?"}
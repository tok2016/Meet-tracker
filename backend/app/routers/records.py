from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from .ollama_functions import OllamaFunctions
from fastapi.responses import StreamingResponse
from app.models import Summary
from app.utils import CurrentUser
from typing import Annotated
from datetime import timedelta
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
                        "type": "string",
                        "description": "Speakers with names"
                    }
                },
                "required": ["topic", "text", "start", "end", "speakers"],
            },
        }
    ],
    function_call={"name": "summarize_text"},
)

#global audio_id
#audio_id = 0

router = APIRouter()

#Запрос для распознования спикеров
@router.post("/record/diarize")
async def record_diarize( file: UploadFile, session: SessionDep, current_user: CurrentUser):
    #global audio_id
    audio = AudioSegment.from_file(io.BytesIO(file.file.read()))
    audio_id = str(uuid4())
    audio_dir = "app/sounds/" + audio_id + "/"
    #file_name = "app/sounds/" + str(uuid4()) + "/audio.wav"
    if not os.path.exists(audio_dir):
        os.mkdir(audio_dir)
    file_name = audio_dir + "audio.wav"
    audio.export(file_name, format="wav")
    #audio_id+=1
    #segments, info = model_whisper.transcribe(file_name, beam_size=5)
    #pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=auth_token_hf)
    #diarization_results = pipeline(file_name)
    #final_results = diarize_text(segments, diarization_results)
    #lines = ""
    #for seg, spk, sent in final_results:
    #    line = f'Start: {seg.start} End: {seg.end} Speaker: {spk} Sentence: {sent}'
    #    lines += f"{line}   "
    #summary_common = model.invoke(f"Give short summary of the text {lines}. Determine the topic of the text. Determine when it starts and ends. List speakers with names")
    summary_common = "content='' additional_kwargs={} response_metadata={} id='run-7a6c305b-38d7-4f81-91bd-5bff5e646b01-0' tool_calls=[{'name': 'summarize_text', 'args': {'topic': 'Conversation between family members', 'text': 'The conversation is about a person who is feeling down and their loved ones trying to comfort them.', 'start': '0.0', 'end': '20.14', 'speakers': 'SPEAKER_02, SPEAKER_00, SPEAKER_03'}, 'id': 'call_6c90d255c518452d800fc54711d70a74', 'type': 'tool_call'}]"
    db_summary = Summary(text=summary_common, user_id = current_user.id, audio_id = audio_id)
    session.add(db_summary)
    session.commit()
    session.refresh(db_summary)

    return { "Общая информация": f"{summary_common}" }

@router.put("/summary/edit")
async def edit_record(session: SessionDep, new_text: str, summary_id: int):
    summary_db = session.get(Summary, summary_id)
    old_data = summary_db.text
    #new_data = re.sub(r"'text': '(.*?)', 'start'", old_data, "new_text")
    new_data = re.sub(r"(?<='text': ').+?(?=', 'start')", "Hiii", old_data)
    summary_db.text = new_data
    session.add(summary_db)
    session.commit()
    session.refresh(summary_db)
    return summary_db


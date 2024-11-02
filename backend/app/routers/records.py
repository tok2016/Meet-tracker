from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.models import User, UserPublic, UserCreate, UserUpdate, Token, UserUpdateMe
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.db import SessionDep
from typing import Annotated
from datetime import timedelta
from app.utils import get_password_hash, verify_password, create_access_token, authenticate, CurrentUser, get_user_by_email
from faster_whisper import WhisperModel, tokenizer
import io
from langchain_ollama import OllamaLLM
from pydub import AudioSegment
from app.utils import diarize_text
from app.hf_token import auth_token_hf
from pyannote.audio import Pipeline
from pyannote.core import Segment, Annotation, Timeline
from pydantic import FilePath

#LANGUAGE_CODES = sorted(tokenizer.LANGUAGES.keys())

#Whsiper модель
model_size = "large-v3"
model_whisper = WhisperModel(model_size, device="cpu", compute_type="int8")
#Llama модель
model_llama = OllamaLLM(model="llama3.1")

router = APIRouter()

#Запрос для использования только whisper
@router.post("/record/")
async def record_transcription( file: UploadFile = File(...)):
    segments, info = model_whisper.transcribe(io.BytesIO(file.file.read()), beam_size=5)
    x = ""
    for segment in segments:
        x+=segment.text
        x+=" "
    return { "text": f"Transcribed text {x}" }

#Запрос для распознования спикеров
@router.post("/record/diarize")
async def record_diarize( file_path: UploadFile, file_name: str = "backend/app/sounds/test.wav"):
    audio = AudioSegment.from_file(io.BytesIO(file_path.file.read()))
    audio.export(file_name, format="wav")
    segments, info = model_whisper.transcribe(file_name, beam_size=5)
    #segments, info = model_whisper.transcribe(io.BytesIO(file.file.read()), beam_size=5)
    pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=auth_token_hf)
    diarization_results = pipeline(file_name)
    final_results = diarize_text(segments, diarization_results)
    lines = ""
    for seg, spk, sent in final_results:
        line = f'{spk} {sent}'
        lines += f"{line}   "
    summary = model_llama.invoke(f"Обобщи текст в целом {lines}. Обобщи текст по каждому говорящему отдельно. Выдели отдельные задачи если они присутствуют")
    return { "text": f"Summarized text: {summary}" }

#Запрос с whisper и llama
@router.post("/record/full")
async def record_summary( file: UploadFile = File(...)):
    segments, info = model_whisper.transcribe(io.BytesIO(file.file.read()), beam_size=5)
    x = ""
    for segment in segments:
        x+=segment.text
        x+=" "
    summary = model_llama.invoke(f"Обобщи текст {x}")
    return { "text": f"Summarized text {summary}" }

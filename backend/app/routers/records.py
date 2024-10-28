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

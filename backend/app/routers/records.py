from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.models import User, UserPublic, UserCreate, UserUpdate, Token, UserUpdateMe
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.db import SessionDep
from typing import Annotated, BinaryIO, Optional, Union, Iterable, Any
from datetime import timedelta
from app.utils import get_password_hash, verify_password, create_access_token, authenticate, CurrentUser, get_user_by_email, load_audio
import whisper
from faster_whisper import WhisperModel
from whisper import tokenizer
import io
LANGUAGE_CODES = sorted(tokenizer.LANGUAGES.keys())


model_size = "large-v3"

# Run on GPU with FP16
model = WhisperModel(model_size, device="cpu", compute_type="int8")

LANGUAGE_CODES = sorted(tokenizer.LANGUAGES.keys())

router = APIRouter()

@router.post("/record/")
async def record_transcription( file: UploadFile = File(...), language: Union[str, None] = Query(default=None, enum=LANGUAGE_CODES),):
    segments, info = model.transcribe(io.BytesIO(file.file.read()), beam_size=5)
    x = ""
    for segment in segments:
        x+=segment.text
        x+=" "
    return { "text": f"Transcribed text {x}" }
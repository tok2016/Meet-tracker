from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, File, UploadFile, Form
from .ollama_functions import OllamaFunctions
from fastapi.responses import StreamingResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.models import User, UserPublic, UserCreate, UserUpdate, Token, UserUpdateMe
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

#Whsiper модель
model_size = "large-v3"
model_whisper = WhisperModel(model_size, device="cpu", compute_type="int8")
#Llama модель
model = OllamaFunctions(model="llama3.1", format="json")
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

router = APIRouter()

#Запрос для распознования спикеров
@router.post("/record/diarize")
async def record_diarize( file_path: UploadFile, file_name: str = "backend/app/sounds/test.wav"):
    audio = AudioSegment.from_file(io.BytesIO(file_path.file.read()))
    audio.export(file_name, format="wav")
    segments, info = model_whisper.transcribe(file_name, beam_size=5)
    pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=auth_token_hf)
    diarization_results = pipeline(file_name)
    final_results = diarize_text(segments, diarization_results)
    lines = ""
    for seg, spk, sent in final_results:
        line = f'Start: {seg.start} End: {seg.end} Speaker: {spk} Sentence: {sent}'
        lines += f"{line}   "
    summary_common = model.invoke(f"Summarize text {lines}. Determine the topic of the text. Determine when it starts and ends. List speakers with names")
    return { "Общая информация": f"{summary_common}" }

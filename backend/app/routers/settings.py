from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, UploadFile, File
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.db import SessionDep
from app.utils import ( get_password_hash, verify_password, create_access_token, 
    authenticate, CurrentUser, get_user_by_email, upload_picture )
from app.settings import settings
from app.models import LlmSettings, WhisperSettings, DiarizeSettings

router = APIRouter()

@router.get("/settings")
def get_settings(session: SessionDep):
    return {
        "app_name": settings.app_name,
        "llm_model": settings.llm_model,
        "whisper_model": settings.whisper_model,
        "whisper_device": settings.whisper_device,
        "whisper_compute": settings.whisper_compute,
        "diarize_type": settings.diarize_type
    }

@router.post("/change_settings")
def change_settings(value: str):
    settings.app_name = value
    return {
        "app_name": settings.app_name,
        "llm_model": settings.llm_model,
        "whisper_model": settings.whisper_model,
        "whisper_device": settings.whisper_device,
        "whisper_compute": settings.whisper_compute,
        "diarize_type": settings.diarize_type
    }

@router.post("/llmSettings")  
async def change_llm_settings(llm_settings: LlmSettings):
  #settings_data = llm_settings.model_dump(exclude_unset=True)
  settings.llm_model = llm_settings.llm_model
  return {
    "llm_model": settings.llm_model
  }

@router.get("/llmSettings")  
async def get_llm_settings():
  return {
    "llm_model": settings.llm_model
  }

@router.post("/sttSettings") 
async def change_whisper_settings(whisper: WhisperSettings):
  settings.whisper_model = whisper.whisper_model
  settings.whisper_device = whisper.whisper_device
  settings.whisper_compute = whisper.whisper_compute
  return {
    "whisper_model": settings.whisper_model,
    "whisper_device": settings.whisper_device,
    "whisper_compute": settings.whisper_compute
  }

@router.get("/sttSettings")
async def get_whisper_settings():
  return {
    "whisper_model": settings.whisper_model,
    "whisper_device": settings.whisper_device,
    "whisper_compute": settings.whisper_compute
  } 

@router.post("/diarizeSettings")
async def change_diarize_settigns(diarize: DiarizeSettings):
  settings.diarize_type = diarize.diarize_type
  return {
    "diarize_type": settings.diarize_type
  }

@router.get("/diarizeSettings")
async def change_diarize_settigns():
  return {
    "diarize_type": settings.diarize_type
  }
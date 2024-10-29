from passlib.context import CryptContext
from typing import Any, Annotated
import secrets
import jwt
from datetime import datetime, timedelta, timezone
from db import SessionDep
from models import TokenPayload, User
from sqlmodel import Session, select
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from pyannote.core import Segment, Annotation, Timeline

ALGORITHM = "HS256"
SECRET_KEY = secrets.token_urlsafe(32)

reusable_oauth2 = OAuth2PasswordBearer( tokenUrl="/user/login" )
TokenDep = Annotated[str, Depends(reusable_oauth2)]

def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_email(session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user

def authenticate(session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.password):
        return None
    return db_user

def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode( token, SECRET_KEY, algorithms=[ALGORITHM] )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException( status_code=status.HTTP_403_FORBIDDEN, detail="Could not validate credentials", )
    user = session.get(User, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]

def get_segments_with_timestamp(transcribe_segments):
    timestamp_segments = []
    for segment in transcribe_segments:
        timestamp_segments.append((Segment(segment.start, segment.end), segment.text))
    return timestamp_segments


def add_speaker_info_to_text(timestamp_segments, ann):
    spk_text = []
    for seg, text in timestamp_segments:
        spk = ann.crop(seg).argmax()
        spk_text.append((seg, spk, text))
    return spk_text


def merge_cache(text_cache):
    sentence = ''.join([item[-1] for item in text_cache])
    spk = text_cache[0][1]
    start = text_cache[0][0].start
    end = text_cache[-1][0].end
    return Segment(start, end), spk, sentence


PUNC_SENT_END = ['.', '?', '!']


def merge_sentence(spk_text):
    merged_spk_text = []
    pre_spk = None
    text_cache = []
    for seg, spk, text in spk_text:
        if spk != pre_spk and pre_spk is not None and len(text_cache) > 0:
            merged_spk_text.append(merge_cache(text_cache))
            text_cache = [(seg, spk, text)]
            pre_spk = spk

        elif text and len(text) > 0 and text[-1] in PUNC_SENT_END:
            text_cache.append((seg, spk, text))
            merged_spk_text.append(merge_cache(text_cache))
            text_cache = []
            pre_spk = spk
        else:
            text_cache.append((seg, spk, text))
            pre_spk = spk
    if len(text_cache) > 0:
        merged_spk_text.append(merge_cache(text_cache))
    return merged_spk_text


def diarize_text(transcribe_res, diarization_result):
    timestamp_segments = get_segments_with_timestamp(transcribe_res)
    spk_text = add_speaker_info_to_text(timestamp_segments, diarization_result)
    res_processed = merge_sentence(spk_text)
    return res_processed

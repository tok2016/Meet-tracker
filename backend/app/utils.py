from passlib.context import CryptContext
from typing import Any, Annotated
import secrets
import jwt
from datetime import datetime, timedelta, timezone
from app.db import SessionDep
from app.models import TokenPayload, User
from sqlmodel import Session, select
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from aiogram import Bot, Dispatcher, types, F
import os
import json
from dotenv import load_dotenv

ALGORITHM = "HS256"
SECRET_KEY = secrets.token_urlsafe(32)
load_dotenv()
bot_token = os.environ.get("BOT_TOKEN")
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

def get_current_active_superuser(current_user: CurrentUser) -> User:
    if not current_user.is_admin:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user

def upload_picture(id, file):
    #Путь где будет располагаться загруженная картинка
    path_image_dir = "app/images/user/profile/" + str(id) + "/"
    full_image_path = os.path.join(path_image_dir, file.filename)

    if not os.path.exists(path_image_dir):
        os.mkdir(path_image_dir)

    file_name = full_image_path.replace(file.filename, "profile.png")

    with open(file_name, "wb") as f:
        f.write(file.file.read())
        f.flush()
        f.close()
    return full_image_path

def cleanup_file(temp_file):
    os.remove(temp_file)

def parse_summaryjson(json_text, string_text):
    dict_data = json.loads(json_text)
    dict_data_seg = dict_data["segments"]
    for segment in dict_data_seg:
        string_text += "Тема: " + f"{segment["topic"]}" +"\n"
        string_text = string_text + "Начало: " + f"{segment["start"]}," +"\n"
        string_text = string_text + "Конец: " + f"{segment["end"]}." +"\n"
        string_text = string_text + f"{segment["text"]}" +"\n"
        speakers_dict = segment["speakers"]
        for i in speakers_dict:
            string_text = string_text + f"{i["speaker_name"]}: " + f"{i["speaker_info"]}" +"\n"
        string_text += "\n"
    return string_text

async def send_bot_message(chat_id, summary_id, summary_topic):
    bot = Bot(token=bot_token)
    text = f"Ваше резюме {summary_topic} готово. Посмотреть его можно по ссылке: http://127.0.0.1:5173/account/summary/{summary_id}"
    await bot.send_message(chat_id=int(chat_id), text=text)
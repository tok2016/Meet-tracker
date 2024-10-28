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


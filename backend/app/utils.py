from passlib.context import CryptContext
from typing import Any
import secrets
import jwt
from datetime import datetime, timedelta, timezone
ALGORITHM = "HS256"
SECRET_KEY = secrets.token_urlsafe(32)

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


#def get_user(db, username: str):
 #   if username in db:
  #      user_dict = db[username]
   #     return UserInDB(**user_dict)


#def authenticate_user(fake_db, username: str, password: str):
#    user = get_user(fake_db, username)
 #   if not user:
 #       return False
 #   if not verify_password(password, user.password):
 #       return False
   # return user
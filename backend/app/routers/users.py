from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.models import User, UserPublic, UserCreate, UserUpdate, Token, UserUpdateMe
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.db import SessionDep
from typing import Annotated, Optional
from datetime import timedelta
from app.utils import ( get_password_hash, verify_password, create_access_token, 
    authenticate, CurrentUser, get_user_by_email, upload_picture )
import os
import datetime
from fastapi_filter import FilterDepends
from fastapi_filter.contrib.sqlalchemy import Filter

ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

router = APIRouter()

class UserFilter(Filter):
    username__in: Optional[list[str]] = None
    registration_date__gte: Optional[datetime.datetime] = None
    registration_date__lte: Optional[datetime.datetime] = None
    first_name__in: Optional[list[str]] = None
    last_name__in: Optional[list[str]] = None

    #username__in: Optional[str]
    #registration_date__gte: Optional[datetime.datetime]
    #registration_date__lte: Optional[datetime.datetime]
    #first_name__in: Optional[str]
    #last_name__in: Optional[str]

    class Constants(Filter.Constants):
        model = User

@router.post("/user/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    db_user = User.model_validate(user, update={"password": get_password_hash(user.password)})
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@router.get("/users/", response_model=list[UserPublic])
def read_users( session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, ):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@router.get("/user/{username}", response_model=UserPublic)
def read_user(user_username: int, session: SessionDep):
    user = session.get(User, user_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/user/{username}", response_model=UserPublic)
def update_user(user_username: int, user: UserUpdate, session: SessionDep):
    user_db = session.get(User, user_username)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["password"] = hashed_password
    user_db.sqlmodel_update(user_data, update=extra_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db


@router.delete("/user/{username}")
def delete_user(user_username: int, session: SessionDep):
    user = session.get(User, user_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"ok": True}


@router.post("/user/login")
def login_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], session: SessionDep) -> Token:
    user = authenticate( session=session, email=form_data.username, password=form_data.password )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(access_token=create_access_token( user.id, expires_delta=access_token_expires ) )

@router.get("/current_user/", response_model=UserPublic)
def read_user_me(current_user: CurrentUser):
    return current_user

@router.patch("/current_user/", response_model=UserPublic)
def update_user_me(session: SessionDep, user_in: UserUpdateMe, current_user: CurrentUser):
    if user_in.email:
        existing_user = get_user_by_email(session=session, email=user_in.email)
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException( status_code=409, detail="User with this email already exists" )
    user_data = user_in.model_dump(exclude_unset=True)
    current_user.sqlmodel_update(user_data)
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return current_user

@router.post("/current_user/upload_picture")
def upload_profile_picture(current_user: CurrentUser, file: UploadFile = File(...),):
    full_image_path = upload_picture(current_user.id, file)
    return {"image": f"{full_image_path}"}

@router.get("/current_user/profile_picture")
def get_profile_picture(current_user: CurrentUser):
    path_image_dir = "app/images/user/profile/" + str(current_user.id) + "/profile.png"
    return FileResponse(path_image_dir)

@router.get("/user/{username}/profile_picture")
def get_user_profile_picutre(user_username: int, current_user: CurrentUser):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=403, detail="Only admin"
        ) 
    path_image_dir = "app/images/user/profile/" + str(user_username) + "/profile.png"
    return FileResponse(path_image_dir)

@router.post("/user/{username}/profile_picture")
def create_user_profile_picutre(user_username: int, current_user: CurrentUser, file: UploadFile = File(...),):
    if not current_user.is_admin:
        raise HTTPException( status_code=403, detail="Only admin" )
    full_image_path = upload_picture(user_username, file)
    return {"image": f"{full_image_path}"}
    
@router.get("/user_filter/")
async def filter_user(session: SessionDep, user_filter: UserFilter = FilterDepends(UserFilter),):
    query = user_filter.filter(select(User))
    result = session.execute(query)
    return result.scalars().all()
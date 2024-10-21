from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query
from app.models import User, UserPublic, UserCreate, UserUpdate
from sqlmodel import Field, Session, SQLModel, create_engine, select
from app.db import SessionDep
from typing import Annotated
from app.utils import get_password_hash

router = APIRouter()


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

#@router.post("/user/login")
#def login_user(session: SessionDep)
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
import datetime
from pydantic import EmailStr


class UserBase(SQLModel):
    username: str = Field(index=True)
    first_name: str = Field(max_length=30)
    last_name: str = Field(max_length=30)
    email: EmailStr = Field(unique=True, max_length=50)


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str
    registration_date: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)

class UserPublic(UserBase):
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    password: str | None = None

sqlite_file_name = "meet_tracker.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]
app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/user/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/users/", response_model=list[UserPublic])
def read_users( session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, ):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@app.get("/user/{username}", response_model=UserPublic)
def read_user(user_username: int, session: SessionDep):
    user = session.get(User, user_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch("/user/{username}", response_model=UserPublic)
def update_user(user_username: int, user: UserUpdate, session: SessionDep):
    user_db = session.get(User, user_username)
    if not user_db:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.model_dump(exclude_unset=True)
    user_db.sqlmodel_update(user_data)
    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    return user_db


@app.delete("/user/{username}")
def delete_user(user_username: int, session: SessionDep):
    user = session.get(User, user_username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"ok": True}

from sqlmodel import Field, Session, SQLModel, create_engine, select
from pydantic import EmailStr
import datetime

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

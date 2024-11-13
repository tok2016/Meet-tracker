
from sqlmodel import Field, Session, SQLModel, create_engine, select
from pydantic import EmailStr, field_validator
import datetime
from fastapi_filter.contrib.sqlalchemy import Filter
from typing import Optional

class UserBase(SQLModel):
    username: str = Field(index=True)
    first_name: str = Field(max_length=30)
    last_name: str | None = Field(max_length=30)
    email: EmailStr = Field(unique=True, max_length=50)
    is_admin: bool = False

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str
    registration_date: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)

class UserPublic(UserBase):
    username: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str | None = Field(default=None)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)
    password: str | None = Field(default=None)

class UserUpdateMe(SQLModel):
    email: EmailStr | None = Field(default=None)
    username: str | None = Field(default=None)
    first_name: str | None = Field(default=None)
    last_name: str | None = Field(default=None)

# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(SQLModel):
    sub: str | None = None

class Summary(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id")
    audio_id: str | None = Field(default=None)
    date: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)
    text: str

class UserFilter(Filter):
    username__like: Optional[str] = None
    registration_date__gte: Optional[datetime.datetime] = None
    registration_date__lte: Optional[datetime.datetime] = None
    first_name__in: Optional[list[str]] = None
    last_name__in: Optional[list[str]] = None
    #is_admin__in: Optional[bool] = None
    order_by: Optional[list[str]]

    class Constants(Filter.Constants):
        model = User
    
    @field_validator("order_by")
    def restrict_sortable_fields(cls, value):
        if value is None:
            return None

        allowed_field_names = ["username", "first_name", "last_name", "registration_date"]

        for field_name in value:
            field_name = field_name.replace("+", "").replace("-", "")  # 
            if field_name not in allowed_field_names:
                raise ValueError(f"You may only sort by: {', '.join(allowed_field_names)}")

        return value
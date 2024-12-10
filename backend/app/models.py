
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

class LlmSettings(SQLModel):
    llm_model: str | None = Field(default="ilyagusev/saiga_llama3")

class WhisperSettings(SQLModel):
    whisper_model: str | None = Field(default="large-v3")
    whisper_device: str | None = Field(default="cpu")
    whisper_compute: str | None = Field(default="int8")

class DiarizeSettings(SQLModel):
    diarize_type: str | None = Field(default="Neural")

class ColorSettings(SQLModel):
    main_color: str | None = Field(default='#F59D0E')
    secondary_color: str | None = Field(default='#F56B00')
    tertiary_color: str | None = Field(default='#F5F5F5')
    quaternary_color: str | None = Field(default='#E7E7E7')
    disabled_color: str | None = Field(default= '#8B8B8B')
    background_color: str | None = Field(default= '#FFFFFF')
    text_main_color: str | None = Field(default= '#000000')
    text_secondary_color: str | None = Field(default= '#8B8B8B')
    text_highlight_color: str | None = Field(default= '#F59D0E')
    text_contrast_color: str | None = Field(default= '#FFFFFF')
    error_color: str | None = Field(default= '#EE1313')

# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class TokenPayload(SQLModel):
    sub: str | None = None

class NewPassword(SQLModel):
    new_password: str = Field(min_length=8, max_length=40)

class Summary(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    user_id: int | None = Field(default=None, foreign_key="user.id")
    audio_id: str | None = Field(default=None)
    creation_date: datetime.datetime = Field(default_factory=datetime.datetime.utcnow, nullable=False)
    text: str

class UserFilter(Filter):
    username__like: Optional[str] = None
    registration_date__gte: Optional[datetime.datetime] = None
    registration_date__lte: Optional[datetime.datetime] = None
    first_name__like: Optional[str] = None
    last_name__like: Optional[str] = None
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

class SummaryFilter(Filter):
    title__like: Optional[str] = None
    creation_date__gte: Optional[datetime.datetime] = None
    creation_date__lte: Optional[datetime.datetime] = None
    order_by: Optional[list[str]]

    class Constants(Filter.Constants):
        model = Summary
    
    @field_validator("order_by")
    def restrict_sortable_fields(cls, value):
        if value is None:
            return None

        allowed_field_names = ["title", "creation_date"]

        for field_name in value:
            field_name = field_name.replace("+", "").replace("-", "")  # 
            if field_name not in allowed_field_names:
                raise ValueError(f"You may only sort by: {', '.join(allowed_field_names)}")

        return value
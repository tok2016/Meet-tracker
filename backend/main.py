from fastapi import FastAPI, Depends, HTTPException, Query
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select
#from pydantic import BaseModel, Field
#from datetime import datetime

class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    username: str = Field(max_length=30)
    password: str
    first_name: str
    last_name: str
    username: str = Field(max_length=50)
    is_admin: bool
    registration_date: datetime = Field(default_factory=datetime.now())

sqlite_file_name = "meettracker.db"
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

@app.get("/{item_id}")
async def getTest(item_id:int):
    return {"message":f"test {item_id}"}

@app.post("/user")
async def registerUser(user:User, session:SessionDep):
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.get("/users/{user_id}", response_model=User)
async def getUser(user_id:int, session:SessionDep):
    user = session.get(User, user_id)
    if not user:
        raise Exception(status_code=404, detail = "No User found")
    return user

#@app.post("/user")
#async def registerUser():

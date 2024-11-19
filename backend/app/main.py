from fastapi import Depends, FastAPI, HTTPException, Query
from .routers import users, records
from app.db import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["user"])
app.include_router(records.router, tags=["record"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
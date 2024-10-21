from fastapi import Depends, FastAPI, HTTPException, Query
from .routers import users
from app.db import create_db_and_tables

app = FastAPI()

app.include_router(users.router, tags=["user"])

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
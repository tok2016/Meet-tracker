from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def getTest():
    return {"message":"test1"}
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI on Vercel!"}


@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}


handler = Mangum(app)

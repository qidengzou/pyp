from fastapi import FastAPI
 
app = FastAPI()
 
@app.get("/")
def read_root():
    return {"Python": "on Vercel", "status": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI"}

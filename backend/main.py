from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from karen.assistant import Karen


app = FastAPI(title="BBS Core")


app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


karen = Karen()


@app.get("/")
def root():

    return {
        "system": "BBS",
        "status": "online",
        "ai": "Karen"
    }


@app.post("/karen")
def ask_karen(data: dict):

    message = data.get("message", "")

    response = karen.respond(message)

    return {
        "assistant": "Karen",
        "response": response
    }
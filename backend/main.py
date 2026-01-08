from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_inventory")
async def get_inventory():
    return {
        "White Monster": 3,
        "Peach Monster": 1,
        "Red Bull": 9
    }
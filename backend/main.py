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

#Drink name, Percent, Comment
@app.get("/get_recommendations")
async def get_recommendations():
    return {
        "Peach Monster": (96, "This drink matches your preferred flavor, sugar, and caffiene content."),
        "White Monster": (85, "This drink matches your preferred sugar and caffiene content."),
        "Red Bull": (70, "This drink matches your preferred caffiene content.")
    }
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from data.supabase import SupabaseClient

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PreferencesRequest(BaseModel):
    username: str
    flavor: str
    brand: str
    sugar: str
    caffeine: str
    calorie: str

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

@app.post("/set_preferences")
async def set_preferences(prefs: PreferencesRequest):
    supabase = SupabaseClient()
    supabase.set_user_prefs(
        prefs.username,
        prefs.flavor,
        prefs.brand,
        prefs.sugar,
        prefs.caffeine,
        prefs.calorie
    )
    return {
        "message": "Preferences set successfully"
    }
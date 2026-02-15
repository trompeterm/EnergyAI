from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from data.supabase import SupabaseClient
from services.rec import RecommendationService

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

@app.get("/get_recommendations")
async def get_recommendations(username: str):
    supabase = SupabaseClient()
    prefs = supabase.get_user_prefs(username)

    if not prefs:
        raise HTTPException(status_code=404, detail="User preferences not found")

    rec_service = RecommendationService()
    recommendations = rec_service.get_recommendations(
        flavor=prefs["flavor_preference"],
        brand=prefs["brand_preference"],
        sugar=prefs["sugar_preference"],
        caffeine=prefs["caffeine_preference"],
        calorie=prefs["calorie_preference"]
    )

    return recommendations

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
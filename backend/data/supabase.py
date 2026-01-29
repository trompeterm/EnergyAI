from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

class SupabaseClient:
    def __init__(self):
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        self.client = create_client(url, key)

    def set_user_prefs(self, username, flavor, brand, sugar, caffeine, calorie):
        self.client.table("user").upsert({
            "username": username,
            "flavor_preference": flavor,
            "brand_preference": brand,
            "sugar_preference": sugar,
            "caffeine_preference": caffeine,
            "calorie_preference": calorie
        }, on_conflict='username').execute()
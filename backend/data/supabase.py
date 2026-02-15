from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

class SupabaseClient:
    def __init__(self):
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")
        self.client = create_client(url, key)

    def get_user_prefs(self, username):
        result = self.client.table("user").select("*").eq("username", username).execute()
        if result.data:
            return result.data[0]
        return None

    def set_user_prefs(self, username, flavor, brand, sugar, caffeine, calorie):
        self.client.table("user").upsert({
            "username": username,
            "flavor_preference": flavor,
            "brand_preference": brand,
            "sugar_preference": sugar,
            "caffeine_preference": caffeine,
            "calorie_preference": calorie
        }, on_conflict='username').execute()
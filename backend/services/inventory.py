from supabase import create_client
import os
from dotenv import load_dotenv
load_dotenv()

class InventoryManagerService:
    def __init__(self):
        self.client = create_client(os.environ.get("SUPABASE_URL"), os.environ.get("SUPABASE_KEY"))

    def get_inventory(self): 
        result = self.client.table("inventory").select("*").execute()
        return result.data

    def add_item(self, drink_name: str):
        existing = next((item for item in self.get_inventory() if item["drink_name"] == drink_name), None)

        if existing:
            self.client.table("inventory").update({
                "quantity": existing["quantity"] + 1
            }).eq("drink_name", drink_name).execute()
        else:
            self.client.table("inventory").insert({
                "drink_name": drink_name,
                "quantity": 1
            }).execute()

    def remove_item(self, drink_name: str):
        existing = next((item for item in self.get_inventory() if item["drink_name"] == drink_name), None)

        if existing and existing["quantity"] > 0:
            self.client.table("inventory").update({
                "quantity": existing["quantity"] - 1
            }).eq("drink_name", drink_name).execute()

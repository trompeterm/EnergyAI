from google import genai
from dotenv import load_dotenv
import numpy as np
import os

load_dotenv()

DRINKS = [
    {"name": "Mango Monster",       "text": "Flavor: Mango | Brand: Monster | Sugar: 54g | Caffeine: 160mg | Calories: 230"},
    {"name": "Watermelon Celsius",   "text": "Flavor: Watermelon | Brand: Celsius | Sugar: 0g | Caffeine: 200mg | Calories: 10"},
    {"name": "Citrus Red Bull",      "text": "Flavor: Citrus | Brand: Red Bull | Sugar: 27g | Caffeine: 80mg | Calories: 110"},
    {"name": "Berry Bang",           "text": "Flavor: Berry | Brand: Bang | Sugar: 0g | Caffeine: 300mg | Calories: 0"},
    {"name": "Peach Reign",          "text": "Flavor: Peach | Brand: Reign | Sugar: 0g | Caffeine: 300mg | Calories: 10"},
    {"name": "Tropical Rockstar",    "text": "Flavor: Tropical | Brand: Rockstar | Sugar: 31g | Caffeine: 160mg | Calories: 140"},
]

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

class RecommendationService:
    def __init__(self):
        self.client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    def get_recommendations(self, flavor: str, brand: str, sugar: str, caffeine: str, calorie: str):
        user_text = f"Flavor: {flavor} | Brand: {brand} | Sugar: {sugar}g | Caffeine: {caffeine}mg | Calories: {calorie}"
        texts = [user_text] + [d["text"] for d in DRINKS]

        results = self.client.models.embed_content(
            model="gemini-embedding-001",
            contents=texts,
            config=genai.types.EmbedContentConfig(task_type="SEMANTIC_SIMILARITY")
        )

        embeddings = [np.array(e.values) for e in results.embeddings]
        user_embedding = embeddings[0]
        drink_embeddings = embeddings[1:]

        scored = [
            {"name": DRINKS[i]["name"], "score": round(cosine_similarity(user_embedding, drink_embeddings[i]) * 100)}
            for i in range(len(DRINKS))
        ]

        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:3]
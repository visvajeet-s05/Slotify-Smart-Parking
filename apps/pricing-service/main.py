from fastapi import FastAPI
from pydantic import BaseModel, Field
from .environment import ParkingPricingEnv
import numpy as np

app = FastAPI(title="Slotify pricing")
env = ParkingPricingEnv()
class PricingInput(BaseModel):
    occupancy_rate: float = Field(ge=0, le=1); arrival_rate: float = Field(ge=0); departure_rate: float = Field(ge=0)
    hour_of_day: int = Field(ge=0, le=23); day_of_week: int = Field(ge=0, le=6); rain_intensity: float = Field(ge=0); nearby_event_active: bool
@app.post("/v1/pricing/predict")
def predict(data: PricingInput):
    state = np.array([data.occupancy_rate, data.arrival_rate, data.departure_rate, data.hour_of_day, data.day_of_week, data.rain_intensity, float(data.nearby_event_active)], dtype=np.float32)
    action = 5 if data.occupancy_rate > .85 else 3 if data.occupancy_rate > .65 else 2
    return {"multiplier": float(1 + env.actions[action]), "action": int(action), "model": "safe-fallback"}

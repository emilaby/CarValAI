from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
from google.cloud import storage
import os

"""
Loads the model from Google Cloud and via the predict endpoint and 
passes in required data fields to make a prediction and returns the prediction from the model
"""

if not os.path.exists("model.joblib"):
    client = storage.Client()
    bucket = client.bucket("carvalai-model")
    blob = bucket.blob("model.joblib")
    blob.download_to_filename("model.joblib")

try:
    model = joblib.load("model.joblib")
except Exception:
    raise RuntimeError("Failed to load ML model")

app = FastAPI(title="Car Price Prediction API")

API_KEY = os.getenv("BACKEND_API_KEY")
if not API_KEY:
    raise RuntimeError("BACKEND_API_KEY environment variable is not set")

ANNUAL_MILEAGE = 8000

class Car(BaseModel):
    make: str
    model: str
    variant: str
    body_type: str
    miles: float
    engine_vol: float
    transmission: str
    fuel_type: str
    full_service: int
    part_service: int
    age: float


@app.post("/predict")
def predict(car: Car, api_key: str = Header(None)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )

    predictions = []

    for year in range(6):
        features = pd.DataFrame([{
            "make": car.make,
            "model": car.model,
            "variant": car.variant,
            "body_type": car.body_type,
            "miles": car.miles + (year * ANNUAL_MILEAGE),
            "engine_vol": car.engine_vol,
            "transmission": car.transmission,
            "fuel_type": car.fuel_type,
            "full_service": car.full_service,
            "part_service": car.part_service,
            "age": car.age + year
        }])

        try:
            prediction = model.predict(features)
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="Prediction failed"
            )

        predictions.append({
            "years_from_present": year,
            "miles": car.miles + (year * ANNUAL_MILEAGE),
            "price": round(float(np.expm1(prediction[0])), 2)
        })

    return {
        "predictions": predictions
    }

@app.get("/health")
def health():
    return {"status": "ok"}
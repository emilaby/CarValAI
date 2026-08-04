from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

print("CURRENT DIR:", os.getcwd())
print("FILES:", os.listdir())
print("MODEL SIZE:", os.path.getsize("model.joblib"))


app = FastAPI(title="Car Price Prediction API")
model = joblib.load("model.joblib")

print("MODEL LOADED")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def predict(car: Car):
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
        
        prediction = model.predict(features)

        predictions.append({
            "years_from_present": year,
            "miles": car.miles + (year * ANNUAL_MILEAGE),
            "price": round(float(np.expm1(prediction[0])), 2)
        })

    return {
        "predictions": predictions
    }
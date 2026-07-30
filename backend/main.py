from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="Car Price Prediction API")
model = joblib.load("model.joblib")

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

    features = pd.DataFrame([{
        "make": car.make,
        "model": car.model,
        "variant": car.variant,
        "body_type": car.body_type,
        "miles": car.miles,
        "engine_vol": car.engine_vol,
        "transmission": car.transmission,
        "fuel_type": car.fuel_type,
        "full_service": car.full_service,
        "part_service": car.part_service,
        "age": car.age
    }])
    
    prediction = model.predict(features)

    return {
        "car_price_prediction": round(float(np.expm1(prediction[0])), 2)
    }
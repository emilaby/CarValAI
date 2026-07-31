import pandas as pd
import json

df = pd.read_csv("car_listings_cleaned.csv")

cars = {}

for make, make_group in df.groupby("make"):
    cars[make] = {}
    for model, model_group in make_group.groupby("model"):
        cars[make][model] = list(model_group["variant"].unique())

f = open("cars.json", "w")
json.dump(cars, f, indent=2)
f.close()

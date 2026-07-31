import pandas as pd
import json

df = pd.read_csv("car_listings_cleaned.csv")

fuel_types = list(df["fuel_type"].unique())

f = open("fuel_types.json", "w")
json.dump(fuel_types, f, indent=2)
f.close()

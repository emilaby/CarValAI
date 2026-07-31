import pandas as pd
import json

df = pd.read_csv("car_listings_cleaned.csv")

body_types = list(df["body_type"].unique())

f = open("body_types.json", "w")
json.dump(body_types, f, indent=2)
f.close()

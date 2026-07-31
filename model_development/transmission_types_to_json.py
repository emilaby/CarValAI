import pandas as pd
import json

df = pd.read_csv("car_listings_cleaned.csv")

transmissions = list(df["transmission"].unique())

f = open("transmissions.json", "w")
json.dump(transmissions, f, indent=2)
f.close()

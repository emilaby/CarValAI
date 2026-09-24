import pandas as pd
import json
from pathlib import Path

df = pd.read_csv(Path(__file__).resolve().parent.parent / "data" / "car_listings_cleaned.csv")

body_types = list(df["body_type"].unique())

f = open("body_types.json", "w")
json.dump(body_types, f, indent=2)
f.close()

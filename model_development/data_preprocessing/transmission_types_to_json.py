import pandas as pd
import json
from pathlib import Path

df = pd.read_csv(Path(__file__).resolve().parent.parent / "data" / "car_listings_cleaned.csv")

transmissions = list(df["transmission"].unique())

f = open("transmissions.json", "w")
json.dump(transmissions, f, indent=2)
f.close()

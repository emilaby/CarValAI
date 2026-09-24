import pandas as pd
from pathlib import Path

def clean_listings():
    df = pd.read_csv(Path(__file__).resolve().parent.parent / "data" / "car_listings.csv")

    df = df.rename(columns={"feul_type":"fuel_type"})

    df["year"] = pd.to_numeric(df["year"], errors="coerce")
    df["age"] = 2022 - df["year"] # dataset is from 2022

    df = df.dropna(subset=["age"])

    df = df.drop(columns=[
        "Unnamed: 0",
        "car_badges","car_title",
        "car_sub_title",
        "car_attention_grabber",
        "car_specs",
        "car_seller",
        "car_seller_rating",
        "car_seller_location",
        "part_warranty",
        "full_dealership",
        "finance_available",
        "discounted",
        "ulez",
        "first_year_road_tax",
        "brand_new",
        "engine_size",
        "engine_size_unit",
        "reg",
        "num_owner",
        "year"
    ])

    df = df.dropna(subset=["model", "variant", "body_type", "miles", "engine_vol", "transmission", "fuel_type"])

    df["make"] = df["make"].str.strip().str.lower()
    df["model"] = df["model"].str.strip().str.lower()
    df["variant"] = df["variant"].str.strip().str.lower()
    df["body_type"] = df["body_type"].str.strip().str.lower()
    df["transmission"] = df["transmission"].str.strip().str.lower()
    df["fuel_type"] = df["fuel_type"].str.strip().str.lower()

    df.to_csv(Path(__file__).resolve().parent.parent / "data" / "car_listings_cleaned.csv", index=False)
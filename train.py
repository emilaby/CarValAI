import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import TargetEncoder
from sklearn.compose import ColumnTransformer


df = pd.read_csv("car_listings_cleaned.csv")
X = df.drop("car_price", axis=1)
y = df["car_price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

encoder = ColumnTransformer(
    transformers=[
        ("one_hot_encoder", OneHotEncoder(handle_unknown="ignore"), ["make", "body_type", "transmission", "fuel_type"]),
        ("target_encoder", TargetEncoder(cv=5, smooth="auto", random_state=42), ["model", "variant"])
    ],
    remainder="passthrough"
)

X_train_enc = encoder.fit_transform(X_train, y_train)
X_test_enc = encoder.transform(X_test)


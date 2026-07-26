import pandas as pd
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.model_selection import KFold, cross_val_score



df = pd.read_csv("car_listings_cleaned.csv")
X = df.drop("car_price", axis=1)
y = df["car_price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

cat_features=[
    "make",
    "model",
    "variant",
    "body_type",
    "transmission",
    "fuel_type",
]

model = CatBoostRegressor(
    loss_function="RMSE",
    random_seed=42,
    verbose=100,
    thread_count=-1,
    cat_features=cat_features
)

kf_validation = KFold(n_splits=3, shuffle=True, random_state=42)

scores = cross_val_score(
    model,
    X_train,
    y_train,
    scoring="neg_root_mean_squared_error",
    cv=kf_validation
) 

print(scores)
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import TargetEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import StratifiedKFold, cross_val_score
from xgboost import XGBRegressor


df = pd.read_csv("car_listings_cleaned.csv")
X = df.drop("car_price", axis=1)
y = df["car_price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

encoder = ColumnTransformer(
    transformers=[
        ("one_hot_encoder", OneHotEncoder(handle_unknown="ignore"), ["make", "body_type", "transmission", "fuel_type"]),
        ("target_encoder", TargetEncoder(cv=3, smooth="auto", random_state=42, target_type="continuous"), ["model", "variant"])
    ],
    remainder="passthrough"
)

model = XGBRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="reg:squarederror",
    random_state=42,
    n_jobs=-1,
    verbosity=2
)

pipeline = Pipeline([
    ("preprocessor", encoder),
    ("model", model)
])

y_binned = pd.qcut(np.expm1(y_train), q=10, labels=False)
skf_validation = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)

"""
y_binned = pd.qcut(y_train, q=10, labels=False)
skf_validation = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)

scores = cross_val_score(
    pipeline,
    X_train,
    y_train,
    scoring="neg_root_mean_squared_error",
    cv=skf_validation.split(X_train, y_binned)
) 

print(scores)
"""
pipeline.fit(X_train, y_train)

xgb = pipeline.named_steps["model"]
print(xgb.feature_importances_)
print(xgb.feature_names)

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import TargetEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV
from xgboost import XGBRegressor


df = pd.read_csv("car_listings_cleaned.csv")
X = df.drop("car_price", axis=1)
y = np.log1p(df["car_price"])

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
    objective="reg:squarederror",
    random_state=42,
    n_jobs=-1
)

y_binned = pd.qcut(np.expm1(y_train), q=10, labels=False)
skf_validation = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)

param_dist = {
    "model__n_estimators": [1500, 1800],
    "model__learning_rate": [0.05, 0.075],
    "model__max_depth": [10, 11, 12, 13, 14],
    "model__min_child_weight": [1, 2, 3],
    "model__subsample": [0.9, 1.0],
    "model__colsample_bytree": [0.9, 1.0],
    "model__reg_lambda": [1, 2, 4],
    "model__reg_alpha": [0, 0.1, 0.2, 0.4]
}

pipeline = Pipeline([
    ("preprocessor", encoder),
    ("model", model)
])

search = RandomizedSearchCV(
    estimator=pipeline,
    param_distributions=param_dist,
    n_iter=50,
    cv=skf_validation.split(X_train, y_binned),
    random_state=42,
    n_jobs=1,
    verbose=2,
    scoring="neg_root_mean_squared_error"
)

search.fit(X_train, y_train)

print(search.best_params_)
print(-search.best_score_)





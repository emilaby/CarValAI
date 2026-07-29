import pandas as pd
import numpy as np
from catboost import CatBoostRegressor
from sklearn.model_selection import train_test_split
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV

df = pd.read_csv("car_listings_cleaned.csv")
X = df.drop("car_price", axis=1)
y = np.log1p(df["car_price"])

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

y_binned = pd.qcut(np.expm1(y_train), q=10, labels=False)
skf_validation = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)

param_dist = {
    "iterations": [500, 1000, 1500],
    "depth": [4, 6, 8, 10],
    "learning_rate": [0.03, 0.05, 0.1],
    "l2_leaf_reg": [1, 3, 5, 10],
}

search = RandomizedSearchCV(
    estimator=model,
    param_distributions=param_dist,
    n_iter=8,
    cv=skf_validation.split(X_train, y_binned),
    random_state=42,
    n_jobs=1,
    verbose=2,
    scoring="neg_root_mean_squared_error"
)

search.fit(X_train, y_train)

print(search.best_params_)
print(-search.best_score_)
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import TargetEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from sklearn.metrics import root_mean_squared_error, mean_absolute_error, mean_absolute_percentage_error, r2_score

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
    subsample=1,
    reg_lambda=2,
    reg_alpha=0.2,
    n_estimators=1800,
    min_child_weight=1,
    max_depth=13,
    learning_rate=0.05,
    colsample_bytree=0.9,
    random_state=42,
    n_jobs=-1,
    verbosity=1
)

pipeline = Pipeline([
    ("preprocessor", encoder),
    ("model", model)
])

pipeline.fit(X_train, y_train)

y_pred_log = pipeline.predict(X_test)

y_pred = np.expm1(y_pred_log)
y_actual = np.expm1(y_test)

rmse = root_mean_squared_error(y_actual, y_pred)
mae = mean_absolute_error(y_actual, y_pred)
mape = mean_absolute_percentage_error(y_actual, y_pred)
r2 = r2_score(y_actual, y_pred)

print("RMSE: ", rmse)
print("MAE: ", mae)
print("MAPE: ", mape)
print("R^2: ", r2)

results = pd.DataFrame({
    "actual_price": y_actual,
    "predicted_price": y_pred,
    "error": y_pred - y_actual,
    "percentage_error": ((y_pred - y_actual) / y_actual) * 100
})

results.to_csv("final_model_predictions.csv", index=False)
joblib.dump(pipeline, "model.pkl")
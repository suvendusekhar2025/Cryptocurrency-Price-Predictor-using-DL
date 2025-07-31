import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
import warnings
warnings.filterwarnings('ignore')  # Suppress all warnings

from flask import Flask, request, jsonify, send_from_directory
import yfinance as yf
import numpy as np
from datetime import datetime

try:
    from keras.models import load_model
    from sklearn.preprocessing import MinMaxScaler
    model = load_model("./model.keras")
    model_loaded = True
except Exception as e:
    model_loaded = False
    model_load_error = str(e)

app = Flask(__name__, static_folder="static")

@app.route("/api/predict", methods=["POST"])
def api_predict():
    if not model_loaded:
        return jsonify({"error": f"Model not loaded: {model_load_error}"}), 500
    data = request.get_json()
    stock = data.get("stock", "BTC-USD")
    no_of_days = int(data.get("no_of_days", 10))
    end = datetime.now()
    start = datetime(end.year - 10, end.month, end.day)
    stock_data = yf.download(stock, start, end)
    if stock_data.empty or 'Close' not in stock_data:
        return jsonify({"error": "Invalid stock ticker or no data available."}), 400
    closing_price = stock_data[['Close']].dropna()
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(closing_price)
    if len(scaled_data) < 100:
        return jsonify({"error": "Not enough data to make prediction."}), 400
    last_100 = scaled_data[-100:].reshape(1, -1, 1)
    future_predictions = []
    for _ in range(no_of_days):
        next_day = model.predict(last_100)
        future_predictions.append(scaler.inverse_transform(next_day)[0, 0])
        last_100 = np.append(last_100[:, 1:, :], next_day.reshape(1, 1, -1), axis=1)
    return jsonify({
        "stock": stock,
        "future_predictions": [float(pred) for pred in future_predictions],
        "no_of_days": no_of_days
    })

@app.route("/", methods=["GET"])
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/static/<path:path>")
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route("/predictor.html", methods=["GET"])
def serve_predictor():
    return send_from_directory(app.static_folder, "predictor.html")

if __name__ == "__main__":
    print("\nYour website will be available at: http://127.0.0.1:5000/\n")
    app.run(debug=True)

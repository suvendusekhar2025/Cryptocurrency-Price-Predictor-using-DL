# Cryptocurrency-Price-Predictor-using-DL


---

## 🎯 **Objective**

The goal of this project is to **predict the future closing price of Bitcoin (BTC-USD)** using historical data and a deep learning model — specifically **Long Short-Term Memory (LSTM)** networks. The model aims to provide accurate predictions and visualize future trends in a user-interactive way.

---

## 🧰 **Tools and Technologies Used**

| Component             | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| 🐍 Python             | Core programming language                                       |
| 📦 Libraries          | `yfinance`, `pandas`, `numpy`, `matplotlib`, `sklearn`, `keras` |
| 📉 yFinance           | For fetching 15 years of historical BTC data                    |
| 📈 Matplotlib         | For plotting and visualization                                  |
| 🔄 Scikit-learn       | For data scaling and evaluation metrics                         |
| 🤖 TensorFlow/Keras   | For building and training the LSTM model                        |
| 📦 MinMaxScaler       | To normalize prices before feeding into LSTM                    |
| 📊 Evaluation Metrics | RMSE, MAE, and R² for model performance                         |

---

## 🧠 **Methodology and Step-by-Step Workflow**

### 1. **Data Collection**

* Collected 15 years of **Bitcoin price data** using `yfinance`.
* Focused mainly on the **closing price**, which is the most relevant metric for investors.

---

### 2. **Exploratory Data Analysis (EDA)**

* Displayed summary statistics using `.head()`, `.describe()`, `.info()`.
* Plotted the closing price over time.
* Added **100-day** and **365-day** **moving averages** to observe long-term trends.

---

### 3. **Preprocessing**

* Extracted only the ‘Close’ column from the dataset.
* Normalized data using `MinMaxScaler` to scale values between 0 and 1.
* Created sequences of the last **100 days** as inputs to predict the next day — a time-series sliding window approach.

---

### 4. **Model Building: LSTM**

* Built a deep learning model using **Keras Sequential API**:

  * 2 LSTM layers (128 and 64 units)
  * Dense layers to output final prediction
* Optimized using **Adam optimizer** and **Mean Squared Error loss**
* Trained for **10 epochs** with a batch size of 5

---

### 5. **Model Evaluation**

* Compared model predictions with actual test data.
* Calculated:

  * **RMSE (Root Mean Squared Error)**: Measures prediction accuracy
  * **MAE (Mean Absolute Error)**: Measures average error
  * **R² Score**: Measures how well the model explains variance in data
* Visualized actual vs. predicted prices using a line chart

---

### 6. **Future Forecasting**

* Predicted the **next N days** of prices (default = 10 days) using a loop over the last 100 days of data.
* Allowed users to **input the number of days** to forecast interactively.
* Plotted the future predicted prices with value annotations.

---

### 7. **Model Saving**

* Saved the trained model using `.save("model.keras")` for future use or deployment.

---

## 🧠 **What You Learn from This Project**

| Topic                      | Learning Outcome                                              |
| -------------------------- | ------------------------------------------------------------- |
| 📊 Time Series Forecasting | Understand how to format and process sequential data          |
| 🤖 Deep Learning           | Hands-on with LSTM — specialized for time-dependent patterns  |
| 📈 Data Normalization      | Why and how to normalize data for neural networks             |
| 📉 Evaluation Metrics      | Interpret RMSE, MAE, and R² to evaluate model quality         |
| 🔍 Exploratory Analysis    | Detect trends using moving averages and visualization         |
| 🛠️ Model Deployment Prep  | How to save models and make reusable prediction functions     |
| 🎛️ User Interaction       | Allow user-driven dynamic inputs inside a notebook or web app |

---

## ✅ Final Thoughts

This project offers **real-world exposure** to working with time-series data, building LSTM-based neural networks, and visualizing predictive results in a compelling and interactive format. It’s a fantastic foundation for anyone interested in applying deep learning to financial forecasting.


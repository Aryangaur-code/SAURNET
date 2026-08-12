# SAURNET
Edge-AI framework for solar monitoring with real-time fault detection, anomaly analysis and short-term power forecasting with minimal cloud dependency
# SAURNET

**Edge-AI framework for real-time solar monitoring — fault detection, anomaly analysis, and short-term power forecasting with minimal cloud dependency.**

SAURNET is an edge-first monitoring framework for photovoltaic (PV) systems. Instead of streaming raw sensor data to the cloud, it runs lightweight machine-learning models directly on an edge device, analyzes system health in real time, and transmits only meaningful events — alerts, summaries, and forecasts. This reduces latency, bandwidth, and cloud cost while keeping the system operational during intermittent connectivity.

This project is the basis of a publication accepted at the 4th International Conference in Engineering and Management (ICIEM'26).

---

## Problem

Conventional solar monitoring depends heavily on continuous internet connectivity and centralized cloud processing. In remote or distributed installations this introduces latency, high bandwidth usage, recurring cloud costs, and single points of failure when the network drops.

SAURNET is designed around one principle: **process locally, communicate intelligently.** The edge device answers three questions continuously:

- Is the system operating normally?
- Is a fault or abnormal condition emerging?
- How much power is the system likely to generate in the near future?

---

## Key Features

- **Real-time monitoring** of voltage, current, power, energy, panel and ambient temperature, and irradiance.
- **Fault detection** combining rule-based thresholds, statistical analysis, and ML models to flag underperformance, over/under-voltage and current, sudden power drops, thermal degradation, partial-shading signatures, and sensor faults.
- **Anomaly analysis** using lightweight models (Isolation Forest, autoencoders, rolling-window statistics) that produce an anomaly score and severity classification.
- **Short-term power forecasting** from historical and real-time features (power, irradiance, temperature, time of day).
- **Event-driven communication** — periodic summaries during normal operation, immediate alerts on anomalies and faults, rather than continuous raw-data upload.
- **Solar Health Score** — a unified 0–100 indicator combining electrical performance, thermal condition, power stability, and anomaly frequency.

---

## System Architecture

```
Solar PV System
      |
Data Acquisition  (voltage, current, power, temperature, irradiance)
      |
Edge Device  (Raspberry Pi / SBC)
      |
Edge-AI Engine
   |-- Fault Detection
   |-- Anomaly Detection
   |-- Power Forecasting
      |
Event / Alert / Summary
      |
Communication Layer  (MQTT / Wi-Fi / LoRaWAN / Cellular)
      |
Optional Cloud  (database, API, dashboard, analytics)
```

The edge pipeline runs: data validation → noise filtering → feature extraction → fault + anomaly detection → health analysis → forecasting → event classification → local action, with optional cloud sync.

---

## Tech Stack

| Layer | Tools |
|---|---|
| Language | Python |
| ML / Data | scikit-learn, TensorFlow / TensorFlow Lite, NumPy, Pandas |
| Vision (optional) | OpenCV |
| Edge Hardware | Raspberry Pi / SBC, ESP32 sensor nodes, voltage/current/temperature/irradiance sensors |
| Communication | MQTT, Wi-Fi, LoRaWAN, Cellular |
| Storage | SQLite / lightweight time-series store |
| API | FastAPI / Flask |
| Visualization | Streamlit, Plotly, React.js dashboard |

Models are optimized for edge deployment using TensorFlow Lite conversion, INT8 quantization, pruning, and feature reduction to minimize model size, RAM, CPU load, and inference latency.

---

## Project Structure

```
SAURNET/
├── data/              # raw, processed, and sample datasets
├── models/            # fault_detection, anomaly_detection, forecasting
├── edge/              # data acquisition, preprocessing, inference, device manager
├── communication/     # mqtt, lorawan, cellular
├── analytics/         # anomaly analysis, health score, performance
├── forecasting/       # feature engineering, training, inference
├── dashboard/         # frontend + backend
├── tests/
├── configs/
├── scripts/
├── requirements.txt
├── README.md
└── LICENSE
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Aryangaur-code/saurnet.git
cd saurnet
```

Create and activate a virtual environment:

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux / macOS
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### Running

```bash
# Start the edge monitoring service
python edge/main.py

# Launch the dashboard
streamlit run dashboard/app.py
```

> Exact entry points may vary as the implementation evolves.

---

## Example Event Payload

Instead of raw streams, the edge device emits compact structured events:

```json
{
  "device_id": "SAURNET-001",
  "timestamp": "2026-08-12T11:30:00",
  "status": "ANOMALY",
  "power": 1842.6,
  "anomaly_score": 0.87,
  "fault_probability": 0.72,
  "forecast_power": 1910.4,
  "severity": "MEDIUM"
}
```

---

## Evaluation

The framework is evaluated across four dimensions:

- **Fault detection:** accuracy, precision, recall, F1, false-alarm rate, detection latency.
- **Anomaly detection:** precision, recall, F1, ROC-AUC, false-positive rate.
- **Forecasting:** MAE, RMSE, MAPE, R².
- **Edge performance:** CPU/RAM usage, inference latency, model size, energy use, bandwidth reduction.

---

## Roadmap

- [x] Edge-first architecture design
- [x] Monitoring parameters and fault-detection pipeline
- [x] Anomaly-detection and forecasting pipeline design
- [ ] Sensor integration and edge-device deployment
- [ ] Dataset collection, model training and validation
- [ ] TensorFlow Lite optimization
- [ ] MQTT-based event communication
- [ ] Dashboard development
- [ ] Hardware-in-the-loop and field testing
- [ ] Multi-site deployment

---

## Scalability

SAURNET extends from a single rooftop installation to distributed sites — solar farms, microgrids, and institutional systems — each running edge-AI locally and reporting to an optional centralized dashboard through a gateway.

---

## Author

**Aryan Gaur** — B.Tech, Artificial Intelligence, Birla Institute of Technology, Mesra

- GitHub: [Aryangaur-code](https://github.com/Aryangaur-code)
- LinkedIn: [aryan-gaur](https://www.linkedin.com/in/aryan-gaur-bb8349293/)
- Portfolio: [aryan-gaur-portfolio.vercel.app](https://aryan-gaur-portfolio.vercel.app/)


Collaborator
**Yashowardhan Wghela** — B.Tech, CSE, Birla Institute of Technology, Mesra
- Github: https://github.com/yashosw10
---

## License

Released under the MIT License. See the `LICENSE` file for details.

---

*Sense locally. Detect early. Forecast intelligently. Communicate efficiently.*

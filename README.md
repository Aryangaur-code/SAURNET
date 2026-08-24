# SaurNet: AI-Powered Solar Energy Management Platform 

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python)

SaurNet is an intelligent, scalable, and highly interactive Solar Energy Management Platform designed to optimize microgrid operations, monitor photovoltaic (PV) array health, and maximize financial returns.

By leveraging artificial intelligence for computer vision (CV) diagnostics, real-time telemetry analytics, and dynamic localized financial models, SaurNet bridges the gap between hardware sensor data and actionable operational intelligence.

---

## 🚀 Key Features

*   ⚡ **Real-time Telemetry & Monitoring:** Sub-second latency visualization of energy generated (kWh), conversion efficiency (%), and grid health.
*   🤖 **AI-Driven CV Diagnostics:** Computer Vision module capable of analyzing optical and thermal drone imagery of PV arrays to instantly identify dust, micro-cracks, and hotspots.
*   💸 **Financial & Environmental Analytics:** Dynamically calculates ROI, amortization periods, and CO₂ offsets based on localized electricity tariffs (Includes presets for INR / Rajasthan rates).
*   🚨 **Automated Alerting:** Proactively notifies operators of inverter overloads, grid interconnect issues, and array inefficiencies.
*   🎨 **Premium UI/UX:** Built with Tailwind CSS and Recharts, featuring a fully responsive layout with seamless Light/Dark mode transitions.

## 💻 Tech Stack

### Frontend
*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **Data Visualization:** Recharts
*   **State Management:** React Query (TanStack)

### Backend
*   **Framework:** FastAPI (Python)
*   **Architecture:** Modular microservices (Auth, Telemetry, Analytics, Operations)
*   **AI Integration:** Endpoints configured for AI chat assistance and Computer Vision processing.

---

## 🛠️ Installation & Setup

To run SaurNet locally, you need to spin up both the FastAPI backend and the Next.js frontend.

### 1. Backend Setup (FastAPI)
Navigate to the `backend` directory and start the Python server:

```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the development server
uvicorn app:app --reload --port 8000
```
*The backend API will be available at `http://localhost:8000`*

### 2. Frontend Setup (Next.js)
Open a new terminal, navigate to the `frontend` directory, and start the Next.js app:

```bash
cd frontend
# Install dependencies
npm install

# Run the development server
npm run dev
```
*The frontend will be available at `http://localhost:3000`*

---

## 📸 Screenshots

*(Add screenshots of your dashboard, financial analytics page, and CV diagnostic tools here)*
* `![Dashboard Overview](/public/screenshots/dashboard.png)`
* `![Financial Analytics](/public/screenshots/financial.png)`
* `![CV Inspection](/public/screenshots/cv-inspection.png)`

---

## 🔌 Hardware Data Acquisition (DAS)
SaurNet is designed to ingest telemetry from:
*   **Meteorological Sensors:** Pyranometers (GHI), Anemometers, Shielded Thermocouples.
*   **Electrical Sensors:** DC Voltage/Current transducers, AC Smart Energy Meters.
*   **Edge Gateways:** Modbus RTU/TCP IoT gateways streaming to the backend via MQTT/REST.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Authors

**Aryan Gaur** — B.Tech, Artificial Intelligence, Birla Institute of Technology, Mesra
- GitHub: [Aryangaur-code](https://github.com/Aryangaur-code)
- LinkedIn: [aryan-gaur](https://www.linkedin.com/in/aryan-gaur-bb8349293/)
- Portfolio: [aryan-gaur-portfolio.vercel.app](https://aryan-gaur-portfolio.vercel.app/)

**Yashowardhan Wghela** — B.Tech, CSE, Birla Institute of Technology, Mesra
- Github: [yashosw10](https://github.com/yashosw10)

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

*Sense locally. Detect early. Forecast intelligently. Communicate efficiently.*

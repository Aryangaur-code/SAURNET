const API_BASE = "http://localhost:8000";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  return handleResponse(res);
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE}/analytics`);
  return handleResponse(res);
}

export async function fetchAlerts() {
  const res = await fetch(`${API_BASE}/alerts`);
  return handleResponse(res);
}

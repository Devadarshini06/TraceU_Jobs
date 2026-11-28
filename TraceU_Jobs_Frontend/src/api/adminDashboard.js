import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export async function getAdminDashboard(days = 30) {
  const token = getAdminToken();
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard?days=${days}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (response.status === 401) {
    clearAdminSession();
  }

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.message || payload?.error || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return payload.data;
}


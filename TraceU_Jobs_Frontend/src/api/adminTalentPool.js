import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const TALENT_POOL_PREFIX = `${API_BASE_URL}/api/v1/admin/talent-pool`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${TALENT_POOL_PREFIX}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders
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
    const message = payload?.message || payload?.error || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export async function getTalentPool(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'All' && value !== 'ALL') {
      qs.set(key, String(value));
    }
  });
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return request(query, { method: 'GET' });
}

export async function addToTalentPool(payload) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function importTalentPool(candidates) {
  return request('/import', {
    method: 'POST',
    body: JSON.stringify({ candidates })
  });
}

export async function updateTalentPoolAvailability(id, availability) {
  return request(`/${id}/availability`, {
    method: 'PATCH',
    body: JSON.stringify({ availability })
  });
}

export async function getTalentPoolNotes(id) {
  return request(`/${id}/notes`, { method: 'GET' });
}

export async function addTalentPoolNote(id, note) {
  return request(`/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note })
  });
}

export async function contactTalentPoolCandidate(id, { subject, body }) {
  return request(`/${id}/contact`, {
    method: 'POST',
    body: JSON.stringify({ subject, body })
  });
}

export async function removeFromTalentPool(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}


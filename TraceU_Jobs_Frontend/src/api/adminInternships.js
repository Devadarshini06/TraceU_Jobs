import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const INTERNSHIPS_PREFIX = `${API_BASE_URL}/api/v1/admin/internships`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${INTERNSHIPS_PREFIX}${path}`, {
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

export async function getInternships() {
  return request('', { method: 'GET' });
}

export async function createInternship(payload) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function updateInternship(id, payload) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export async function updateInternshipStatus(id, status) {
  return request(`/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function deleteInternship(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}

export async function inviteInternshipCompany(payload) {
  return request('/invite-company', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function getInternshipApplications(id) {
  return request(`/${id}/applications`, { method: 'GET' });
}


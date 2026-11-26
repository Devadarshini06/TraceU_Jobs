import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const CANDIDATES_API_PREFIX = `${API_BASE_URL}/api/v1/admin/candidates`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, body, ...restOptions } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(`${CANDIDATES_API_PREFIX}${path}`, {
    ...restOptions,
    body,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

export async function getCandidates(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'ALL') {
      qs.set(key, String(value));
    }
  });
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return request(query, { method: 'GET' });
}

export async function createCandidate(payload) {
  return request('', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function updateCandidate(id, payload) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export async function updateCandidateStatus(id, { status, inTalentPool } = {}) {
  return request(`/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...(status ? { status } : {}),
      ...(typeof inTalentPool === 'boolean' ? { in_talent_pool: inTalentPool } : {})
    })
  });
}

export async function deleteCandidate(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}

export async function uploadCandidateResume(id, file) {
  const formData = new FormData();
  formData.append('resume', file);
  const path = id ? `/${id}/resume` : '/upload-resume';
  return request(path, {
    method: 'POST',
    body: formData
  });
}

export async function importCandidates(candidates) {
  return request('/import', {
    method: 'POST',
    body: JSON.stringify({ candidates })
  });
}


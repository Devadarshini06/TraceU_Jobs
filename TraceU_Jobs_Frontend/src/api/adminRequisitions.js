import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const ADMIN_API_PREFIX = `${API_BASE_URL}/api/v1/admin`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${ADMIN_API_PREFIX}${path}`, {
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

export async function getRequisitions() {
  return request('/requisitions', { method: 'GET' });
}

export async function createRequisition({ code, title, department, headcount }) {
  return request('/requisitions', {
    method: 'POST',
    body: JSON.stringify({
      code,
      title,
      department,
      headcount: Number(headcount) || 1
    })
  });
}

export async function updateRequisition(id, { title, department, headcount, status }) {
  return request(`/requisitions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      department,
      headcount: Number(headcount) || 1,
      ...(status ? { status } : {})
    })
  });
}

export async function updateRequisitionStatus(id, status) {
  return request(`/requisitions/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function deleteRequisition(id) {
  return request(`/requisitions/${id}`, {
    method: 'DELETE'
  });
}

export async function getRequisitionStatusSummary() {
  return request('/requisitions/status-summary', { method: 'GET' });
}

export async function getRequisitionActivity(limit = 10) {
  return request(`/activity?entity_type=requisition&limit=${limit}`, { method: 'GET' });
}

export async function getCareersSync() {
  return request('/careers-sync', { method: 'GET' });
}

export async function updateCareersSync({ autoSync, websiteUrl } = {}) {
  return request('/careers-sync', {
    method: 'PATCH',
    body: JSON.stringify({
      ...(typeof autoSync === 'boolean' ? { auto_sync: autoSync } : {}),
      ...(websiteUrl ? { website_url: websiteUrl } : {})
    })
  });
}

export async function triggerCareersSync() {
  return request('/careers-sync/sync', { method: 'POST' });
}

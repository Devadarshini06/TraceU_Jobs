import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const SETTINGS_PREFIX = `${API_BASE_URL}/api/v1/admin/settings`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${SETTINGS_PREFIX}${path}`, {
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
    throw error;
  }

  return payload;
}

export async function getSettings() {
  return request('', { method: 'GET' });
}

export async function saveSettingsSection(section, data) {
  return request(`/${section}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function inviteWorkspaceUser(payload) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function updateWorkspaceUser(id, payload) {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
}

export async function deleteWorkspaceUser(id) {
  return request(`/users/${id}`, {
    method: 'DELETE'
  });
}

export async function testIntegrationConnection(id, payload) {
  return request(`/integrations/${id}/test`, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}


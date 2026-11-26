import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const JOBS_API_PREFIX = `${API_BASE_URL}/api/v1/admin/jobs`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${JOBS_API_PREFIX}${path}`, {
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

export async function getJobs() {
  return request('', { method: 'GET' });
}

export async function createJob({ title, department, location, jobType, status, description, requirements, source }) {
  return request('', {
    method: 'POST',
    body: JSON.stringify({
      title,
      department,
      location,
      job_type: jobType,
      status,
      description,
      requirements,
      source
    })
  });
}

export async function updateJob(id, { title, department, location, jobType, status, description, requirements, source }) {
  return request(`/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      department,
      location,
      job_type: jobType,
      status,
      description,
      requirements,
      source
    })
  });
}

export async function updateJobStatus(id, status) {
  return request(`/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function deleteJob(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}

export async function publishToJobBoards() {
  return request('/publish-boards', {
    method: 'POST'
  });
}


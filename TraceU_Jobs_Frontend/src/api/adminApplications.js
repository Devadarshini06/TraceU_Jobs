import { clearAdminSession, getAdminToken } from 'api/adminAuth';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const ADMIN_API_PREFIX = `${API_BASE_URL}/api/v1/admin`;

async function request(path = '', options = {}) {
  const token = getAdminToken();
  const { headers: customHeaders, body, ...restOptions } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(`${ADMIN_API_PREFIX}${path}`, {
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

export async function getApplications(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'ALL') {
      qs.set(key, String(value));
    }
  });
  const query = qs.toString() ? `?${qs.toString()}` : '';
  return request(`/applications${query}`, { method: 'GET' });
}

export async function createApplication({
  candidateId,
  candidateName,
  candidateEmail,
  phone,
  location,
  experience,
  skills,
  jobId,
  jobTitle,
  stage,
  matchScore
}) {
  return request('/applications', {
    method: 'POST',
    body: JSON.stringify({
      ...(candidateId ? { candidate_id: candidateId } : {}),
      candidate_name: candidateName,
      candidate_email: candidateEmail,
      ...(phone ? { phone } : {}),
      ...(location ? { location } : {}),
      ...(experience ? { experience } : {}),
      ...(skills ? { skills } : {}),
      ...(jobId ? { job_id: jobId } : {}),
      job_title: jobTitle,
      ...(stage ? { stage } : {}),
      ...(matchScore ? { match_score: Number(matchScore) } : {})
    })
  });
}

export async function updateApplicationStage(id, stage) {
  return request(`/applications/${id}/stage`, {
    method: 'PATCH',
    body: JSON.stringify({ stage })
  });
}

export async function uploadApplicationResume(id, file) {
  const formData = new FormData();
  formData.append('resume', file);
  return request(`/applications/${id}/resume`, {
    method: 'POST',
    body: formData
  });
}

export async function deleteApplication(id) {
  return request(`/applications/${id}`, {
    method: 'DELETE'
  });
}

export async function scheduleInterview({ applicationId, scheduledAt, interviewer, notes }) {
  return request('/interviews', {
    method: 'POST',
    body: JSON.stringify({
      application_id: Number(applicationId),
      scheduled_at: scheduledAt,
      interviewer,
      notes
    })
  });
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const ADMIN_API_PREFIX = `${API_BASE_URL}/api/v1/admin`;

const TOKEN_KEY = 'traceu_admin_token';
const TOKEN_EXPIRES_KEY = 'traceu_admin_token_expires_at';
const USER_KEY = 'traceu_auth_user';
const PORTAL_KEY = 'traceu_current_portal';

async function request(path, options = {}) {
  const { headers: customHeaders, ...restOptions } = options;
  const response = await fetch(`${ADMIN_API_PREFIX}${path}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders
    }
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
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

export function saveAdminSession(loginData) {
  const { token, expires_at: expiresAt, admin } = loginData;
  localStorage.setItem(TOKEN_KEY, token);
  if (expiresAt) {
    localStorage.setItem(TOKEN_EXPIRES_KEY, String(expiresAt));
  }
  localStorage.setItem(PORTAL_KEY, 'admin');
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      id: admin?.id,
      name: admin?.name || 'Admin',
      email: admin?.email || '',
      role: admin?.role || 'Administrator',
      avatar_url: admin?.avatar_url || ''
    })
  );
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRES_KEY);
  localStorage.removeItem(USER_KEY);
  if (localStorage.getItem(PORTAL_KEY) === 'admin') {
    localStorage.removeItem(PORTAL_KEY);
  }
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdminUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated() {
  const token = getAdminToken();
  if (!token) return false;

  const expiresAt = Number(localStorage.getItem(TOKEN_EXPIRES_KEY) || 0);
  if (expiresAt > 0 && Date.now() / 1000 >= expiresAt) {
    clearAdminSession();
    return false;
  }
  return true;
}

export async function adminLogin({ email = '', password = '', keepSignedIn = true } = {}) {
  const payload = await request('/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
      password,
      keep_signed_in: keepSignedIn
    })
  });
  saveAdminSession(payload.data);
  return payload;
}

export async function adminOAuthLogin(provider, { email = '', name = '', avatarUrl = '', keepSignedIn = true } = {}) {
  const payload = await request(`/oauth/${encodeURIComponent(provider.toLowerCase())}`, {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
      name: name.trim(),
      avatar_url: avatarUrl,
      keep_signed_in: keepSignedIn
    })
  });
  saveAdminSession(payload.data);
  return payload;
}

export async function adminForgotPassword(email) {
  return request('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim() })
  });
}

export async function adminResetPassword({ token, newPassword }) {
  return request('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, new_password: newPassword })
  });
}

export async function adminRequestAccess({ name, email, reason = '' }) {
  return request('/request-access', {
    method: 'POST',
    body: JSON.stringify({ name, email, reason })
  });
}

export async function getAdminProfile() {
  const token = getAdminToken();
  if (!token) {
    throw new Error('No admin token found');
  }
  return request('/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function adminLogout() {
  const token = getAdminToken();
  try {
    await request('/logout', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  } catch {
    // Always clear local session even if server call fails
  } finally {
    clearAdminSession();
  }
}


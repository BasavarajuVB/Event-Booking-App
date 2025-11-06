const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('token') || '';
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    headers['Authorization'] = 'Bearer ' + getToken();
  }
  
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  const data = await res.json().catch(() => ({}));
  
  if (!res.ok) {
    throw { ...data, status: res.status };
  }
  
  return data;
}

export const api = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload }),
  
  login: async (payload) => {
    const data = await request('/api/auth/login', { method: 'POST', body: payload });
    return data;
  },
  
  listEvents: () => request('/api/events'),
  
  createEvent: (payload) => request('/api/events', { method: 'POST', body: payload, auth: true }),
  
  book: (payload) => request('/api/tickets/book', { method: 'POST', body: payload, auth: true }),
  
  cancel: (id) => request(`/api/tickets/cancel/${id}`, { method: 'PATCH', auth: true }),
  
  report: () => request('/api/admin/report', { auth: true }),
};

export default api;

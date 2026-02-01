const BASE_URL = 'http://localhost:5000/api';

// helper
const request = async (url, options = {}) => {
  const token = localStorage.getItem('taskflow_token');

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API error');
  }

  return res.json();
};

export const api = { 

  signup: async (name, email, password) => {
    const data = await request(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
 
     localStorage.setItem('taskflow_token', data.token);
    localStorage.setItem('taskflow_user', JSON.stringify(data.user));

    return data.user;
  },

  login: async (email, password) => {
    const data = await request(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

  localStorage.setItem('taskflow_token', data.token);
    localStorage.setItem('taskflow_user', JSON.stringify(data.user));

    return data.user;
  },

  logout: () => {
  localStorage.removeItem('taskflow_token');
  localStorage.removeItem('taskflow_user');  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('taskflow_user'));
  },

  /* ---------------- TASKS ---------------- */

  getTasks: async () => {
    return request(`${BASE_URL}/tasks`);
  },

  createTask: async (task) => {
    return request(`${BASE_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  updateTask: async (id, updates) => {
    return request(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteTask: async (id) => {
    return request(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};

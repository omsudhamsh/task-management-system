import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => localStorage.removeItem('token'),
};

export const taskService = {
    getAll: () => api.get('/tasks'),
    create: (task) => api.post('/tasks', task),
    update: (id, task) => api.put(`/tasks/${id}`, task),
    delete: (id) => api.delete(`/tasks/${id}`),
};

export const userService = {
    getAll: () => api.get('/users'),
};

export default api;

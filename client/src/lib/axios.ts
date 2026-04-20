import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
});

api.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem('auth-storage') || '{}');
  const token = authData?.state?.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
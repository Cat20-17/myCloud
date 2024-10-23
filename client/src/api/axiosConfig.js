import axios from 'axios';
import ApiClient from './apiClient';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  if (!config.url.includes('/auth/register') && !config.url.includes('/auth/login')) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
},
  (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
      if(error.response && error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
        try {
          const response = await ApiClient.post('/auth/refresh', {},{ withCredentials: true });
          const newAccessToken = response.headers['authorization'].split(' ')[1];

          if (newAccessToken) {
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            localStorage.setItem('token', newAccessToken);

            return instance(error.config);
          }
        } catch (error) {
          window.dispatchEvent(new CustomEvent('authError'));
        }
      }
    });

export default instance;

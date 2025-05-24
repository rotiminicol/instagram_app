
import axios from 'axios';

const authAPI = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:9Y3R7lds',
});

// Request interceptor to add auth token
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default authAPI;

import axios from 'axios';

const socialAPI = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:8Hqiic6m',
});

socialAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers.Authorization !== undefined) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default socialAPI;
import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_BASE_URL,
=======
  baseURL: 'http://43.201.167.247:8080/api/v1',
>>>>>>> e840207565724cc8b22b55406b1841e018cbd72e
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  // console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;

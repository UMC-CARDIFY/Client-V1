import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.37.13.40:8080/api/v1',
  //baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
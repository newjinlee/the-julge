import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.THE_JULGE_API_BASE_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // 토큰을 로컬 저장소에서 가져옵니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

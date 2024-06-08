import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.THE_JULGE_API_BASE_URL,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default axiosInstance;

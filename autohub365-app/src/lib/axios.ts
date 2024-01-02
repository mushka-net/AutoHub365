import axios from 'axios';
import { useStore } from '../store/store';
const BASE_URL = 'http://localhost:8000/api';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = useStore.getState().userToken;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

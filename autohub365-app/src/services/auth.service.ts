import axios from '../lib/axios';
import { axiosPrivate } from '../lib/axios';

type PostAuthResponse = {
  token: string;
  user_id: number;
};

export const register = (username: string, password: string) => {
  const response = axios.post<PostAuthResponse>('/create', {
    username,
    password,
  });
  return response;
};

export const login = (username: string, password: string) => {
  const response = axios.post<PostAuthResponse>('/login', {
    username,
    password,
  });
  return response;
};

export const logout = () => {
  const response = axiosPrivate.post('/logout');
  return response;
};

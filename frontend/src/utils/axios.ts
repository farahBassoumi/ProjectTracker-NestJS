import axios from 'axios';
import { error } from 'console';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    const authString = localStorage.getItem('auth');

    if (authString) {
      const { accessToken } = JSON.parse(authString);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
  },
);

export default instance;

import axios from 'axios';

export const baseURL = 'http://localhost:3000';

const instance = axios.create({
  baseURL,
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
    return Promise.reject(error);
  },
);

export default instance;

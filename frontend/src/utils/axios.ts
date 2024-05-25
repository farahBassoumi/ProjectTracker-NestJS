import axios from 'axios';

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

export default instance;

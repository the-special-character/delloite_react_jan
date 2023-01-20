import axios from 'axios';
import { UserType } from '../../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  timeoutErrorMessage: 'Something went wrong',
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('user');
    if (token) {
      const tokenObj: UserType = JSON.parse(token);
      config.headers.Authorization = `Bearer ${tokenObj.accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data) {
      return Promise.reject(new Error(error.response.data));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

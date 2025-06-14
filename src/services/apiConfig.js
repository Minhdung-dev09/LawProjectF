import axios from 'axios';

export const API_BASE_URL = "https://backend-law-vxco.onrender.com/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth header interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
import axios from "axios";

// Base URL chung cho tất cả API
export const API_BASE_URL = "https://lawbackend-cr50.onrender.com//api";

// Các endpoint constants để dễ quản lý
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: "/users/auth",
  USER_PROFILE: "/users/profile",
  USERS: "/users",

  // Consultation endpoints
  CONSULTATIONS: "/consultations",
  MY_CONSULTATIONS: "/consultations/my",

  // News endpoints
  NEWS: "/news",
  TOP_VIEWED_NEWS: "/news/top-viewed",
  LATEST_NEWS: "/news/latest",

  // Comments endpoints
  COMMENTS: "/comments",

  // Orders endpoints
  ORDERS: "/orders",

  // Products endpoints
  PRODUCTS: "/products",

  // Cart endpoints (có thể cần thay đổi domain sau)
  CART: "/cart",
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
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

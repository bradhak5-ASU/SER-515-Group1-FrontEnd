import { toastNotify } from "@/lib/utils";
import axios from "axios";

// 1. Create a new instance of axios with a base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Authentication error: Token is invalid or expired.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("rememberMe");
      toastNotify("Your session has expired. Please log in again.", "error");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;

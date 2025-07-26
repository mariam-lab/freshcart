import axios from "axios";
import { API_CONFIG } from "../config";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseurl,
  timeout: 3000,
});

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }

  return config;
});
apiClient.interceptors.response.use(
  (response) => {
    return Promise.resolve({
      success: true,
      data: response.data,
    });
  },
  (error) => {
    return Promise.reject({
      success: false,
      error: error,
      message: error.response.data.message,
    });
  }
);

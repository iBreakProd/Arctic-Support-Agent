import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      `Request failed: ${error.response?.status ?? "unknown"}`;
    return Promise.reject(new Error(message));
  }
);

export default api;
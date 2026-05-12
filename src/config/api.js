import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API Base URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout for all requests
});

api.interceptors.request.use((config) => {

  // Do NOT attach token for login/register
  const publicRoutes = ["/login", "/patient/registerPatient"];

  const isPublicRoute = publicRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (!isPublicRoute) {

    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;

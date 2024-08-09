import axios from "axios";
import qs from "qs";
import config from "../config";
import toast from "react-hot-toast";

// Create an instance of axios for API requests
const api = axios.create({
  baseURL: `${config.VERSION_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to set the content type to 'x-www-form-urlencoded' when needed
api.interceptors.request.use(
  (config) => {
    if (config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Send the refresh token as a query parameter in the URL
        const response = await api.post(
          `${config.VERSION_BASE_URL}/auth/refresh-token?token=${refreshToken}`
        );

        const { access_token } = response.data;

        // Store the new access token
        localStorage.setItem('access_token', access_token);

        // Update the Authorization header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        toast.error('Session expired, please log in again.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;

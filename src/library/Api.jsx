// src/library/Api.jsx
import axios from "axios";
import qs from "qs";

// Create an instance of axios for API requests
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
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

// Export the axios instances
export default api;

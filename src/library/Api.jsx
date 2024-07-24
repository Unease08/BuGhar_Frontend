import axios from "axios";
import qs from "qs";

// Create an instance of axios with a custom config
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json", // default content type
  },
});

// Interceptor to set the content type to 'x-www-form-urlencoded' when needed
api.interceptors.request.use(
  (config) => {
    if (
      config.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the axios instance to be used in other files
export default api;

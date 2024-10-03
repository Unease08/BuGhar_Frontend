import axios from "axios";
import qs from "qs";
import config from "../config";
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";  // You had a typo here, it should be 'jwt_decode' and not 'jwtDecode'

// Create an instance of axios for API requests
const api = axios.create({
  baseURL: config.VERSION_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header with access token for every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Combined Response Interceptor for token refreshing and handling errors
api.interceptors.response.use(
  (response) => {
    return response;  // If the response is successful, just return it
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    // Handle 401 error (Unauthorized) and refresh the token
    if (error.response && error.response.status === 401 && refreshToken && !originalRequest._retry) {
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

    // If the error is not 401, reject the promise as is
    return Promise.reject(error);
  }
);

// Utility function to check if the token is expired
function isTokenExpired(token) {
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds
    return decodedToken.exp < currentTime;  // Return true if token is expired
  } catch (error) {
    return true;  // Return true if there's any issue decoding the token
  }
}

// Function to call API and check token expiration
export async function secureApiCall(url, method = 'GET', data = null) {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken || isTokenExpired(accessToken)) {
    toast.error("Session expired. Please log in again.");
    localStorage.clear();
    window.location.href = '/login';
    return;
  }

  try {
    const options = {
      url,
      method,
      data,
    };
    const response = await api(options);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;  // Propagate the error so it can be handled elsewhere
  }
}

export default api;

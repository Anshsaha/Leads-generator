import axios from "axios";

// Create an instance of axios with default configurations
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000, // Set your timeout
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const storage: any = localStorage.getItem("token");
    const token = JSON.parse(storage);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

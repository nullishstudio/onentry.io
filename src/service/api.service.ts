import axios from "axios";

const BASE_URI = process.env.NEXT_PUBLIC_LIVE_API;

const axiosInstance = axios.create({
  baseURL: BASE_URI,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("onentry_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.withCredentials = true;
      }
      config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

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
      }
      config.withCredentials = true;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const uploadImage = async (file: File, uploadUrl: string) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export { axiosInstance, uploadImage };

import axios from "axios";

PORT = 8080;

const axiosInstance = axios.create({
  baseURL: `http://localhost:${PORT}`,
  //baseURL: "https://notes-backend-olive.vercel.app/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;

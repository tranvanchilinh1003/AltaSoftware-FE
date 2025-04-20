import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";
import { Cookies } from "react-cookie";

const BASE_URL = "https://fivefood.shop/";
const cookies = new Cookies();

const getToken = () => cookies.get("accessToken");

const createAxiosInstance = (useAuth: boolean = true): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (useAuth) {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = cookies.get("refreshToken");
          if (!refreshToken) {
            return Promise.reject(error);
          }
          const refreshResponse = await axios.get(`${BASE_URL}api/auth/GetAccessToken?token=${refreshToken}`);
          const newAccessToken = refreshResponse.data?.data?.accessToken;
          if (newAccessToken) {
            cookies.set("accessToken", newAccessToken, { maxAge: 60 * 15 });
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token thất bại:", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;

import { API_BASE_URL } from "@/constants";
import axios from "axios";
import { logout, saveCredentials } from "../redux/features/auth/authSlice";
import { RootState, store } from "../redux/store";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state: RootState = store.getState();
        const refreshToken = state.auth.refreshToken;

        const { data } = await axios.get(
          `${API_BASE_URL}/users/auth/token/refresh`,
          {
            headers: {
              "X-Refresh-Token": refreshToken,
            },
          }
        );

        store.dispatch(saveCredentials(data));
        originalRequest.headers.Authorization = data.accessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          console.log(
            "Refresh token failed, logging out user: ",
            refreshError.message
          );
        } else {
          console.log("Refresh token failed, unknown error occurred.");
        }
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

import axios, { AxiosInstance } from "axios";
import { LocalStorageService } from "../services/localStorage.service";
import { logOut } from "../../shared/helpers/token.helper"
import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

export const axiosApi: AxiosInstance = axios.create();
const openNotification = (message: string) => {
  const args: ArgsProps = {
    message: message,
  };
  notification.error(args);
};

axiosApi.interceptors.request.use(
  async config => {
    const token: string = await LocalStorageService.getAccessToken.accessToken;
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`,
      }
    }
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

axiosApi.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  openNotification(error)
  if (error.response.status === 401) {

    console.log("______logOut______");

    logOut();
    return axiosApi(originalRequest);
  }
  return Promise.reject(error);
});
import axios from "axios";
import { FETCH_URL } from "../fetchIp";

const axiosInstance = axios.create({
  baseURL: FETCH_URL,
});
const requestInterceptor = axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    const storeData = JSON.parse(localStorage.getItem('userData'))
    if (accessToken) {
      console.log("access Token from interceptor ==> ", accessToken)
      request.headers["Authorization"] = "Bearer " + accessToken;
      request.headers["Content-Type"] = "application/json";
    }
    return request;
  },
  (error) => {
    throw error; // Throw the error to be caught in the catch block
  }
);
const responseInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status == 401 && !originalRequest?.sent) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("loginToken");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      window.location.href = "/signIn";
      originalRequest.sent = true;
    }
    throw error;
  }
);

export default axiosInstance;

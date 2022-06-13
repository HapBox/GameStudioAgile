import axios from "axios";
import router from "@/router";

const netClient = axios.create({
  baseURL: "http://192.168.3.4:3000",
  timeout: 10000,
});

netClient.interceptors.request.use(
  (request) => {
    const { accessToken } = localStorage;
    if (accessToken) {
      request.headers = {
        "Content-Type": "application/json",
        "x-access-token": localStorage.accessToken,
      };
    }
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

netClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if(error.response.status === 403) router.push("/games");
    return Promise.reject(error);
  }
);

export default netClient;

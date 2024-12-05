import axios from "axios";
import { handleError } from "./handleError";

const axiosInstant = axios.create();

// Add a response interceptor
axiosInstant.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(handleError(error));
  }
);

export default axiosInstant;

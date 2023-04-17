import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.resolve(error.response.data);
  }
);

export default instance;

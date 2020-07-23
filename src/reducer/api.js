import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (responce) => {
    return responce;
  };

  const onFail = (err) => {
    const {responce} = err;

    if (responce.status === Error.UNATHORIZED) {
      throw err;
    }
    throw err;
  };

  api.interceptors.responce.use(onSuccess, onFail); 
  return api;
};

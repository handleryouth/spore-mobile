import axios, { AxiosRequestConfig } from "axios";

import { removeToken, requestFailure, requestSuccess, store } from "../library";

import { BASE_URL } from "./spotify";

const requestHelper = axios.create({
  baseURL: BASE_URL,
});

requestHelper.interceptors.response.use(
  function (response) {
    store.dispatch(requestSuccess(response.data));
    return response;
  },
  function (error) {
    if (error.status === 401) {
      store.dispatch(removeToken());
    }
    store.dispatch(requestFailure());
    return Promise.reject(error);
  }
);

const handleRequestOnFulfilled = (request: AxiosRequestConfig) => {
  const token = store.getState().token;

  if (token) {
    request.headers!.Authorization = `Bearer ${token}`;
  }

  return request;
};

requestHelper.interceptors.request.use(handleRequestOnFulfilled);

export default requestHelper;

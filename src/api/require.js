// src/api/request.js
import http from "./";

export const get = (url, params = {}) => {
  return http.get(url, { params });
};

export const post = (url, data = {}) => {
  return http.post(url, data);
};

export const put = (url, data = {}) => {
  return http.put(url, data);
};

export const del = (url, params = {}) => {
  return http.delete(url, { params });
};

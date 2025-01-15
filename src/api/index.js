// src/api/index.js
import axios from 'axios';
import { API_BASE_URL, TIMEOUT } from './config';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 可以在这里统一设置请求头、添加token等
    config.headers['Content-Type'] = 'application/json';
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 可以在这里统一处理响应数据
    return response.data;
  },
  (error) => {
    // 可以在这里统一处理错误
    if (error.response && error.response.status === 401) {
      // 例如，处理未授权错误
      console.error('未授权，请登录');
    }
    return Promise.reject(error);
  }
);

export default http;
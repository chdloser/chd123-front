// src/api/index.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// 获取题目列表
export const getProblems = (params = {}) => {
  return api.get('/api/get-problems', { params });
};

// 用户注册
export const register = (username, password) => {
  return api.post('/api/register', { username, password });
};

// 用户登录
export const login = (username, password) => {
  return api.post('/api/login', { username, password });
};

// 提交判题结果
export const submitResult = (userId, problemId, result) => {
  return api.post('/api/submit', { userId, problemId, result });
};

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
//客户端需要用到的函数封装
import { post } from '../request';

export const login = (params) => {
  return post('/api/login', params);
};

export const createUser = (data) => {
  return post('/users', data);
};

export const updateUser = (id, data) => {
  return put(`/users/${id}`, data);
};
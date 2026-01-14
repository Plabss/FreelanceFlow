import api from './axios';
import { type AuthResponse, type User } from '../types';

export const loginUser = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post<User>('/users', { name, email, password });
  return response.data;
};
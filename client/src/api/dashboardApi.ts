import api from './axios';
import type { DashboardStats } from '../types';

export const getDashboardStats = async () => {
  const response = await api.get<DashboardStats>('/dashboard');
  return response.data;
};
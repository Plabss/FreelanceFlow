import api from './axios';
import type { Client } from '../types';

export const getClients = async () => {
  const response = await api.get<Client[]>('/clients');
  return response.data;
};

export const createClient = async (data: Partial<Client>) => {
  const response = await api.post<Client>('/clients', data);
  return response.data;
};

export const deleteClient = async (id: string) => {
  await api.delete(`/clients/${id}`);
};
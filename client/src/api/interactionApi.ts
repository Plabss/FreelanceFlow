import api from './axios';
import { type Interaction } from '../types';

export const getInteractions = async () => {
  const response = await api.get<Interaction[]>('/interactions');
  return response.data;
};

export const createInteraction = async (data: Partial<Interaction>) => {
  const response = await api.post<Interaction>('/interactions', data);
  return response.data;
};

export const deleteInteraction = async (id: string) => {
  await api.delete(`/interactions/${id}`);
};
import api from './axios';
import type { Project } from '../types';

export const getProjects = async () => {
  const response = await api.get<Project[]>('/projects');
  return response.data;
};

export const createProject = async (data: Partial<Project>) => {
  const response = await api.post<Project>('/projects', data);
  return response.data;
};

export const deleteProject = async (id: string) => {
  await api.delete(`/projects/${id}`);
};
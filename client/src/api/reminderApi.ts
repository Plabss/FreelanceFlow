import api from './axios';
import { type Reminder } from '../types';

export const getReminders = async () => {
  const response = await api.get<Reminder[]>('/reminders');
  return response.data;
};

export const createReminder = async (data: Partial<Reminder>) => {
  const response = await api.post<Reminder>('/reminders', data);
  return response.data;
};

export const updateReminderStatus = async (id: string, status: 'PENDING' | 'COMPLETED') => {
  const response = await api.patch<Reminder>(`/reminders/${id}`, { status });
  return response.data;
};

export const deleteReminder = async (id: string) => {
  await api.delete(`/reminders/${id}`);
};
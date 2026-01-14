// ENUMS 
export type ProjectStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type InteractionType = 'CALL' | 'MEETING' | 'EMAIL' | 'OTHER';
export type ReminderStatus = 'PENDING' | 'COMPLETED';

// MODELS 
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Auth Response Wrapper
export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  projects?: Project[];
  interactions?: Interaction[];
  reminders?: Reminder[];
}

export interface Project {
  id: string;
  title: string;
  budget?: number;
  deadline?: string;
  status: ProjectStatus;
  clientId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  interactions?: Interaction[];
  reminders?: Reminder[];
}

export interface Interaction {
  id: string;
  type: InteractionType;
  notes: string;
  date: string;
  clientId: string;
  projectId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  project?: Project;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: ReminderStatus;
  clientId?: string;
  projectId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  project?: Project;
}

export interface DashboardStats {
  totalClients: number;
  totalProjects: number;
  projectsByStatus: Array<{
    status: ProjectStatus;
    _count: { status: number };
  }>;
  upcomingReminders: Reminder[];
}
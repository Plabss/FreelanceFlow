import { Calendar, DollarSign, User as UserIcon, Trash2 } from 'lucide-react';
import type { Project } from '../types';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-semibold', statusColors[project.status])}>
            {project.status.replace('_', ' ')}
          </span>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mt-2">{project.title}</h3>
        </div>
        <button 
          onClick={() => onDelete(project.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {project.client && (
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <UserIcon size={16} className="mr-3 text-purple-500" />
            <span className="font-medium">{project.client.name}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar size={14} className="mr-1" />
            {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}
          </div>
          {project.budget && (
            <div className="flex items-center text-gray-900 dark:text-white font-semibold text-sm">
              <DollarSign size={14} className="mr-1 text-green-600" />
              {project.budget.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
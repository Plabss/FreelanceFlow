import { Phone, Mail, Users, FileText, Trash2 } from 'lucide-react';
import { type Interaction } from '../types';
import clsx from 'clsx';

interface InteractionCardProps {
  interaction: Interaction;
  onDelete: (id: string) => void;
}

const typeIcons = {
  CALL: Phone,
  EMAIL: Mail,
  MEETING: Users,
  OTHER: FileText,
};

const typeColors = {
  CALL: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  EMAIL: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  MEETING: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  OTHER: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

const InteractionCard = ({ interaction, onDelete }: InteractionCardProps) => {
  const Icon = typeIcons[interaction.type];

  return (
    <div className="relative pl-8 pb-8 border-l-2 border-gray-200 dark:border-gray-700 last:pb-0">
      {/* Timeline Dot */}
      <div className={clsx(
        "absolute -left-[11px] top-0 w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-gray-900 border-2",
        interaction.type === 'CALL' ? 'border-green-500' : 
        interaction.type === 'EMAIL' ? 'border-blue-500' :
        interaction.type === 'MEETING' ? 'border-purple-500' : 'border-gray-400'
      )}>
        <div className={clsx("w-2 h-2 rounded-full", 
           interaction.type === 'CALL' ? 'bg-green-500' : 
           interaction.type === 'EMAIL' ? 'bg-blue-500' :
           interaction.type === 'MEETING' ? 'bg-purple-500' : 'bg-gray-400'
        )} />
      </div>

      {/* Card Content */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <span className={clsx("p-1.5 rounded-lg mr-3", typeColors[interaction.type])}>
              <Icon size={16} />
            </span>
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {interaction.type}
              </span>
              <p className="text-sm text-gray-500">
                 {new Date(interaction.date).toLocaleDateString()} at {new Date(interaction.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onDelete(interaction.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <p className="text-gray-800 dark:text-gray-200 mb-3 font-medium">
          {interaction.notes}
        </p>

        {/* Linked Client/Project Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {interaction.client && (
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
              @{interaction.client.name}
            </span>
          )}
          {interaction.project && (
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400">
              #{interaction.project.title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractionCard;
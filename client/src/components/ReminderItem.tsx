import { Check, Trash2, Calendar, Clock } from 'lucide-react';
import { type Reminder } from '../types';
import clsx from 'clsx';

interface ReminderItemProps {
  reminder: Reminder;
  onToggle: (id: string, currentStatus: string) => void;
  onDelete: (id: string) => void;
}

const ReminderItem = ({ reminder, onToggle, onDelete }: ReminderItemProps) => {
  const isCompleted = reminder.status === 'COMPLETED';

  return (
    <div className={clsx(
      "flex items-center justify-between p-4 mb-3 rounded-lg border transition-all",
      isCompleted 
        ? "bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 opacity-75" 
        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-sm"
    )}>
      <div className="flex items-center space-x-4">
        {/* Custom Checkbox Button */}
        <button
          onClick={() => onToggle(reminder.id, reminder.status)}
          className={clsx(
            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
            isCompleted
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-blue-500 text-transparent"
          )}
        >
          <Check size={14} />
        </button>

        <div>
          <h4 className={clsx(
            "font-medium text-gray-900 dark:text-white transition-all",
            isCompleted && "line-through text-gray-500"
          )}>
            {reminder.title}
          </h4>
          
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {new Date(reminder.dueDate).toLocaleDateString()}
            </span>
            {reminder.client && (
               <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">
                 @{reminder.client.name}
               </span>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={() => onDelete(reminder.id)}
        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ReminderItem;
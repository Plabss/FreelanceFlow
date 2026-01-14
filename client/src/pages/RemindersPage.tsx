import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReminders, createReminder, updateReminderStatus, deleteReminder } from '../api/reminderApi';
import ReminderItem from '../components/ReminderItem';
import { Loader2, Plus } from 'lucide-react';

const RemindersPage = () => {
  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  
  const queryClient = useQueryClient();

  // Fetch Reminders
  const { data: reminders, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => createReminder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
      setNewTask('');
      setNewDate('');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'PENDING' | 'COMPLETED' }) => 
      updateReminderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReminder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  });

  // Handlers
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask || !newDate) return;
    createMutation.mutate({
      title: newTask,
      dueDate: new Date(newDate).toISOString(), // Fix date format
      status: 'PENDING',
    });
  };

  const handleToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';
    toggleMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">My Tasks & Reminders</h2>

      {/* Quick Add Form */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {createMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={18} className="mr-2"/> Add Task</>}
          </button>
        </form>
      </div>

      {/* Lists */}
      <div className="space-y-6">
        {/* Pending Tasks */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">To Do</h3>
          {reminders?.filter(r => r.status === 'PENDING').map(reminder => (
             <ReminderItem 
               key={reminder.id} 
               reminder={reminder} 
               onToggle={handleToggle}
               onDelete={(id) => deleteMutation.mutate(id)}
             />
          ))}
          {reminders?.filter(r => r.status === 'PENDING').length === 0 && (
            <p className="text-gray-400 italic text-sm">No pending tasks. Great job!</p>
          )}
        </div>

        {/* Completed Tasks */}
        {reminders?.some(r => r.status === 'COMPLETED') && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-8">Completed</h3>
            {reminders?.filter(r => r.status === 'COMPLETED').map(reminder => (
               <ReminderItem 
                 key={reminder.id} 
                 reminder={reminder} 
                 onToggle={handleToggle}
                 onDelete={(id) => deleteMutation.mutate(id)}
               />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;
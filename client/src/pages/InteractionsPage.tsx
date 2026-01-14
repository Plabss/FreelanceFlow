import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInteractions, createInteraction, deleteInteraction } from '../api/interactionApi';
import { getClients } from '../api/clientApi';
import { getProjects } from '../api/projectApi';
import InteractionCard from '../components/InteractionCard';
import Modal from '../components/Modal';
import { Loader2, Plus, Filter } from 'lucide-react';

const InteractionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [form, setForm] = useState({
    type: 'CALL',
    notes: '',
    date: new Date().toISOString().split('T')[0], // Today YYYY-MM-DD
    clientId: '',
    projectId: '',
  });

  const queryClient = useQueryClient();

  // Fetch Data (Parallel)
  const { data: interactions, isLoading } = useQuery({ queryKey: ['interactions'], queryFn: getInteractions });
  const { data: clients } = useQuery({ queryKey: ['clients'], queryFn: getClients });
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => createInteraction({
      ...data,
      date: new Date(data.date).toISOString(), // Fix date format
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interactions'] });
      setIsModalOpen(false);
      setForm({ ...form, notes: '' }); // Reset notes only
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInteraction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['interactions'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Activity Log</h2>
          <p className="text-sm text-gray-500">Track your history with clients</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus size={18} className="mr-2" />
          Log Activity
        </button>
      </div>

      <div className="space-y-2 mt-4">
        {interactions?.map((interaction) => (
          <InteractionCard 
            key={interaction.id} 
            interaction={interaction} 
            onDelete={(id) => deleteMutation.mutate(id)} 
          />
        ))}
        {interactions?.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
            No history yet. Log your first call or email!
          </div>
        )}
      </div>

      {/* Log Activity Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Activity">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="CALL">Call</option>
                <option value="EMAIL">Email</option>
                <option value="MEETING">Meeting</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({...form, date: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Client</label>
            <select
              required
              value={form.clientId}
              onChange={(e) => setForm({...form, clientId: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Client...</option>
              {clients?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Project (Optional)</label>
            <select
              value={form.projectId}
              onChange={(e) => setForm({...form, projectId: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">No specific project</option>
              {projects?.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Notes / Summary</label>
            <textarea
              required
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({...form, notes: e.target.value})}
              placeholder="e.g. Discussed budget increase for phase 2..."
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 flex justify-center items-center"
          >
            {createMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : 'Save Log'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default InteractionsPage;
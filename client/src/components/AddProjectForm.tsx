import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProject } from '../api/projectApi';
import { getClients } from '../api/clientApi';
import { Loader2 } from 'lucide-react';

interface AddProjectFormProps {
  onSuccess: () => void;
}

const AddProjectForm = ({ onSuccess }: AddProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    clientId: '',
    budget: '',
    deadline: '',
    status: 'PENDING',
  });

  const queryClient = useQueryClient();

  // 1. Fetch Clients for the Dropdown
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => createProject({
      ...data,
      // 1. Convert budget string to Number
      budget: data.budget ? Number(data.budget) : undefined,
      // 2. Convert date string (YYYY-MM-DD) to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
      deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
        <input
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Website Redesign"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
        <select
          name="clientId"
          required
          value={formData.clientId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select a Client</option>
          {clients?.map((client) => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget ($)</label>
          <input
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="5000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 flex justify-center items-center"
      >
        {mutation.isPending ? <Loader2 className="animate-spin" size={20} /> : 'Create Project'}
      </button>
    </form>
  );
};

export default AddProjectForm;
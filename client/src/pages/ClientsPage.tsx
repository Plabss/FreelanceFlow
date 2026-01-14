import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClients, deleteClient } from '../api/clientApi';
import { Loader2, Plus } from 'lucide-react';
import ClientCard from '../components/ClientCard';

const ClientsPage = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: clients, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  // 2. Setup Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      // Auto-refresh the list after delete
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  if (isError) return <div className="text-red-500">Failed to load clients.</div>;

  return (
    <div>
      {/* Page Action Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">All Clients</h2>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Plus size={18} className="mr-2" />
          Add Client
        </button>
      </div>

      {/* Grid of Cards */}
      {clients && clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500">No clients found. Add your first one!</p>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;
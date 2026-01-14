import { Mail, Phone, Building, Trash2 } from 'lucide-react';
import type { Client } from '../types';

interface ClientCardProps {
  client: Client;
  onDelete: (id: string) => void;
}

const ClientCard = ({ client, onDelete }: ClientCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{client.name}</h3>
          {client.company && (
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-1">
              <Building size={14} className="mr-1" />
              {client.company}
            </div>
          )}
        </div>
        <button 
          onClick={() => onDelete(client.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1"
          title="Delete Client"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <Mail size={16} className="mr-3 text-blue-500" />
          <a href={`mailto:${client.email}`} className="hover:underline">{client.email}</a>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
          <Phone size={16} className="mr-3 text-green-500" />
          <span>{client.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
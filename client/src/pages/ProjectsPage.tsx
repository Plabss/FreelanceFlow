import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, deleteProject } from '../api/projectApi';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import AddProjectForm from '../components/AddProjectForm';
import { Loader2, Plus } from 'lucide-react';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
  if (isError) return <div className="text-red-500">Failed to load projects.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">All Projects</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus size={18} className="mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
        ))}
        {projects?.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 py-10">No projects yet.</p>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Project"
      >
        <AddProjectForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProjectsPage;
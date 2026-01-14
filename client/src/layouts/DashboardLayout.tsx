import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="ml-64 p-8">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Workspace</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user?.name}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-200">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Page Content Renders Here */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
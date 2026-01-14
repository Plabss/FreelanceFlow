import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/dashboardApi';
import StatCard from '../components/StatCard';
import { Users, Briefcase, Calendar, Loader2, PieChart } from 'lucide-react';
// import { Pie } from 'react-chartjs-2'; 


const DashboardPage = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardStats,
  });

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
  if (isError) return <div className="text-red-500">Failed to load dashboard data.</div>;

  return (
    <div className="space-y-8">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Clients" 
          value={stats?.totalClients || 0} 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          label="Active Projects" 
          value={stats?.totalProjects || 0} 
          icon={Briefcase} 
          color="bg-purple-500" 
        />
        <StatCard 
          label="Upcoming Reminders" 
          value={stats?.upcomingReminders.length || 0} 
          icon={Calendar} 
          color="bg-orange-500" 
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Project Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <PieChart className="mr-2 text-gray-500" size={20} />
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Project Status</h3>
          </div>
          
          <div className="space-y-4">
            {stats?.projectsByStatus.map((item) => (
              <div key={item.status} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {item.status.toLowerCase().replace('_', ' ')}
                </span>
                <span className="font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-600 px-3 py-1 rounded shadow-sm">
                  {item._count.status}
                </span>
              </div>
            ))}
            {stats?.projectsByStatus.length === 0 && (
              <p className="text-gray-400 text-center">No project data yet.</p>
            )}
          </div>
        </div>

        {/* Upcoming Reminders List */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Calendar className="mr-2 text-gray-500" size={20} />
            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Upcoming Deadlines</h3>
          </div>

          <div className="space-y-4">
            {stats?.upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="border-l-4 border-orange-400 pl-4 py-1">
                <p className="font-medium text-gray-800 dark:text-white">{reminder.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(reminder.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
            {stats?.upcomingReminders.length === 0 && (
              <p className="text-gray-400 text-center py-4">No upcoming tasks! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
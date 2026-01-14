import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, Calendar, Phone, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Briefcase, label: 'Projects', path: '/projects' },
    { icon: Calendar, label: 'Reminders', path: '/reminders' },
    { icon: Phone, label: 'Interactions', path: '/interactions' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 flex flex-col transition-all">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-white">FreelanceFlow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center px-4 py-3 rounded-lg transition-colors font-medium',
                isActive
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              )
            }
          >
            <item.icon size={20} className="mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
        >
          <LogOut size={20} className="mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
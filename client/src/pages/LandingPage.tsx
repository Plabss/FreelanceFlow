import { Link } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">FreelanceFlow</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition">
            Log In
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-lg shadow-blue-600/20">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-10 md:mt-20 mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Manage your freelance <br />
          <span className="text-blue-600">business with ease.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
          Track clients, manage projects, and log every interaction in one intuitive dashboard. Built for modern freelancers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-bold transition shadow-xl shadow-blue-600/20">
            Start for Free <ArrowRight className="ml-2" />
          </Link>
          <Link to="/login" className="flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-blue-600 text-lg px-8 py-4 rounded-xl font-bold transition">
            View Demo
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto text-left">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Project Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Keep track of deadlines, budgets, and status updates for all your active projects.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Client CRM</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Never lose a contact. Store client details, notes, and interaction history securely.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Task Automation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Set reminders for follow-ups and deadlines so you never miss an opportunity.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-gray-500 text-sm">
        © 2026 FreelanceFlow. Built with React & NestJS.
      </footer>
    </div>
  );
};

export default LandingPage;
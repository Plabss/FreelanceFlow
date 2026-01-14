import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import { useAuth } from './hooks/useAuth';

// Placeholder Pages
const Dashboard = () => <div className="text-gray-600">Dashboard Stats Coming Soon...</div>;
const Clients = () => <div className="text-gray-600">Clients List Coming Soon...</div>;
const Projects = () => <div className="text-gray-600">Projects List Coming Soon...</div>;

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/reminders" element={<div className="text-gray-600">Reminders...</div>} />
          <Route path="/interactions" element={<div className="text-gray-600">Interactions...</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
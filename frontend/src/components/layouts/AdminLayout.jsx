// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Calendar, Activity, Settings, Bell, Shield
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Logo from '../common/Logo';

const AdminLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active tab from URL
  const currentPath = location.pathname.split('/')[2] || 'overview';

  const navigationTabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: Activity, path: '/admin/overview' },
    { id: 'patients', label: 'Patient Management', icon: Users, path: '/admin/patients' },
    { id: 'doctors', label: 'Medical Staff', icon: Users, path: '/admin/doctors' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    { id: 'settings', label: 'System Settings', icon: Settings, path: '/admin/settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const systemAlerts = [
    { id: 1, type: 'warning', title: 'Server Maintenance Scheduled', message: 'System will be offline from 2:00 AM - 4:00 AM tomorrow', time: '2 hours ago' },
    { id: 2, type: 'info', title: 'High System Load Detected', message: 'Consider upgrading server resources during peak hours', time: '4 hours ago' },
    { id: 3, type: 'success', title: 'Backup Completed Successfully', message: 'Daily backup completed at 3:00 AM', time: '6 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="sm" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Healthcare Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="relative p-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-sm text-gray-600">System Administrator</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {navigationTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  currentPath === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">System Notifications</h3>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {systemAlerts.map(alert => (
              <div key={alert.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'info' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
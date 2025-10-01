// src/components/auth/DashboardRouter.jsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoginPage from '../../pages/auth/LoginPage';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import DoctorDashboard from '../../pages/doctor/DoctorDashboard';
import PatientDashboard from '../../pages/patient/PatientDashboard';

const DashboardRouter = () => {
  const { user, logout } = useAuth();

  // If user is not logged in, show login page
  if (!user) {
    return <LoginPage />;
  }

  // Route based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard user={user} onLogout={logout} />;
    case 'doctor':
      return <DoctorDashboard user={user} onLogout={logout} />;
    case 'patient':
      return <PatientDashboard user={user} onLogout={logout} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Unknown User Role</h1>
            <p className="text-gray-600 mb-4">Role: {user.role}</p>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      );
  }
};

export default DashboardRouter;
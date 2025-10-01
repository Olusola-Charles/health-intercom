// src/components/routing/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Auth pages
import LoginPage from '../../pages/auth/LoginPage';

// Dashboard layouts
import AdminLayout from '../layouts/AdminLayout';
import DoctorLayout from '../layouts/DoctorLayout';
import PatientLayout from '../layouts/PatientLayout';

// Admin pages
import AdminOverview from '../../pages/admin/AdminOverview';
import AdminPatients from '../../pages/admin/AdminPatients';
import AdminDoctors from '../../pages/admin/AdminDoctors';
import AdminAppointments from '../../pages/admin/AdminAppointments';
import AdminSettings from '../../pages/admin/AdminSettings';

// Doctor pages
import DoctorOverview from '../../pages/doctor/DoctorOverview';
import DoctorPatients from '../../pages/doctor/DoctorPatients';
import DoctorSchedule from '../../pages/doctor/DoctorSchedule';
import DoctorNotes from '../../pages/doctor/DoctorNotes.jsx';
// import DoctorMessages from '../../pages/doctor/DoctorMessages';
import Messages from '../../components/shared/Messages'

// Patient pages
import PatientOverview from '../../pages/patient/PatientOverview';
import PatientAppointments from '../../pages/patient/PatientAppointments';
import PatientMedications from '../../pages/patient/PatientMedications';
import PatientRecords from '../../pages/patient/PatientRecords';
// import PatientMessages from '../../pages/patient/PatientMessages';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'doctor':
        return <Navigate to="/doctor" replace />;
      case 'patient':
        return <Navigate to="/patient" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

// Role-based redirect component
const RoleBasedRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  switch (user?.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'doctor':
      return <Navigate to="/doctor" replace />;
    case 'patient':
      return <Navigate to="/patient" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <RoleBasedRedirect /> : <LoginPage />
        } 
      />

      {/* Admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Doctor routes */}
      <Route 
        path="/doctor/*" 
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorOverview />} />
        <Route path="overview" element={<DoctorOverview />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="notes" element={<DoctorNotes />} />
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Patient routes */}
      <Route 
        path="/patient/*" 
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientOverview />} />
        <Route path="overview" element={<PatientOverview />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="medications" element={<PatientMedications />} />
        <Route path="records" element={<PatientRecords />} />
        {/* <Route path="messages" element={<PatientMessages />} /> */}
        <Route path="messages" element={<Messages />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<RoleBasedRedirect />} />
      
      {/* 404 page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
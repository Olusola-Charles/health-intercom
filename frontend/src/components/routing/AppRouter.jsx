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
import Messages from '../../components/shared/Messages'
import DoctorList from '../../pages/doctor/DoctorList';


// Patient pages
import PatientOverview from '../../pages/patient/PatientOverview';
import PatientAppointments from '../../pages/patient/PatientAppointments';
import PatientMedications from '../../pages/patient/PatientMedications';
import PatientRecords from '../../pages/patient/PatientRecords';
import BookAppointment from '../../pages/patient/BookAppointment';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case 'ADMIN':
        return <Navigate to="/admin" replace />;
      case 'DOCTOR':
        return <Navigate to="/doctor" replace />;
      case 'PATIENT':
        return <Navigate to="/patient" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

const AppRouter = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            user?.role === 'ADMIN' ? <Navigate to="/admin" replace /> :
            user?.role === 'DOCTOR' ? <Navigate to="/doctor" replace /> :
            user?.role === 'PATIENT' ? <Navigate to="/patient" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <LoginPage />
          )
        } 
      />

      {/* Admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
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
          <ProtectedRoute allowedRoles={['DOCTOR']}>
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
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientOverview />} />
        <Route path="overview" element={<PatientOverview />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="medications" element={<PatientMedications />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="messages" element={<Messages />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="book-appointment/:doctorId" element={<BookAppointment />} />
      </Route>

      {/* Default redirect */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            user?.role === 'ADMIN' ? <Navigate to="/admin" replace /> :
            user?.role === 'DOCTOR' ? <Navigate to="/doctor" replace /> :
            user?.role === 'PATIENT' ? <Navigate to="/patient" replace /> :
            <Navigate to="/login" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      {/* 404 page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentsAPI } from '../../services/api';
import { Calendar, Clock, MapPin, Phone, Video, Plus, Eye, CheckCircle } from 'lucide-react';

const PatientAppointments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentsAPI.getAll();
      setAppointments(response.data?.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingAppointments = () => {
    const today = new Date();
    return appointments.filter(apt => 
      new Date(apt.appointmentDate) >= today && 
      apt.status !== 'CANCELLED'
    );
  };

  const getPastAppointments = () => {
    const today = new Date();
    return appointments.filter(apt => 
      new Date(apt.appointmentDate) < today || 
      apt.status === 'COMPLETED'
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800 border-green-200';
      case 'SCHEDULED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await appointmentsAPI.cancel(appointmentId, 'Cancelled by patient');
      fetchAppointments(); // Refresh the list
    } catch (error) {
      alert('Failed to cancel appointment');
    }
  };

  const renderUpcomingAppointments = () => {
    const upcoming = getUpcomingAppointments();

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (upcoming.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h3>
          <p className="text-gray-600 mb-6">You don't have any scheduled appointments</p>
          <button
            onClick={() => navigate('/patient/doctors')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Book Appointment
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {upcoming.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600"><strong>Specialty:</strong> {appointment.doctor?.specialization}</p>
                    <p className="text-gray-600"><strong>Reason:</strong> {appointment.reason}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>Time:</strong> {appointment.appointmentTime}</p>
                    <p className="text-gray-600"><strong>Fee:</strong> ${appointment.fee}</p>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800"><strong>Notes:</strong> {appointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                  <Eye size={16} />
                  View Details
                </button>
              </div>
              <div className="flex items-center gap-2">
                {appointment.status === 'SCHEDULED' && (
                  <button 
                    onClick={() => handleCancelAppointment(appointment.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPastAppointments = () => {
    const past = getPastAppointments();

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (past.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Clock className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Appointments</h3>
          <p className="text-gray-600">Your appointment history will appear here</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {past.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-600"><strong>Specialty:</strong> {appointment.doctor?.specialization}</p>
                    <p className="text-gray-600"><strong>Reason:</strong> {appointment.reason}</p>
                  </div>
                  <div>
                    <p className="text-gray-600"><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p className="text-gray-600"><strong>Time:</strong> {appointment.appointmentTime}</p>
                  </div>
                </div>
                {appointment.notes && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800"><strong>Visit Notes:</strong> {appointment.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                View Details
              </button>
              <button 
                onClick={() => navigate('/patient/doctors')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Book Follow-up
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>
        <button
          onClick={() => navigate('/patient/doctors')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Book Appointment
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {[
          { id: 'upcoming', label: 'Upcoming', icon: Calendar },
          { id: 'past', label: 'Past Appointments', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'upcoming' && renderUpcomingAppointments()}
      {activeTab === 'past' && renderPastAppointments()}
    </div>
  );
};

export default PatientAppointments;
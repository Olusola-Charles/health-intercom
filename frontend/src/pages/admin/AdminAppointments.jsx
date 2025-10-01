// src/pages/admin/AdminAppointments.jsx
import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, UserCheck, AlertCircle, Download, 
  Plus, Eye, Edit, MoreVertical, Search, Filter, ChevronLeft, 
  ChevronRight, MapPin
} from 'lucide-react';

const AdminAppointments = () => {
  const [selectedDate, setSelectedDate] = useState('2024-09-01');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample appointment data - in real app, this would come from API
  const appointments = [
    { 
      id: 1, 
      patient: 'John Doe', 
      doctor: 'Dr. Smith', 
      time: '09:00', 
      date: '2024-09-01', 
      status: 'Confirmed', 
      type: 'Consultation', 
      room: '101',
      duration: '30 min',
      phone: '(555) 123-4567',
      notes: 'Follow-up for blood pressure'
    },
    { 
      id: 2, 
      patient: 'Jane Smith', 
      doctor: 'Dr. Williams', 
      time: '10:30', 
      date: '2024-09-01', 
      status: 'Pending', 
      type: 'Follow-up', 
      room: '203',
      duration: '20 min',
      phone: '(555) 234-5678',
      notes: 'Neurology check-up'
    },
    { 
      id: 3, 
      patient: 'Bob Johnson', 
      doctor: 'Dr. Brown', 
      time: '14:00', 
      date: '2024-09-01', 
      status: 'In Progress', 
      type: 'Surgery', 
      room: 'OR-1',
      duration: '120 min',
      phone: '(555) 345-6789',
      notes: 'Scheduled surgery'
    },
    { 
      id: 4, 
      patient: 'Alice Davis', 
      doctor: 'Dr. Taylor', 
      time: '15:30', 
      date: '2024-09-01', 
      status: 'Completed', 
      type: 'Check-up', 
      room: '105',
      duration: '45 min',
      phone: '(555) 456-7890',
      notes: 'Annual physical'
    },
    { 
      id: 5, 
      patient: 'Sarah Johnson', 
      doctor: 'Dr. Miller', 
      time: '08:30', 
      date: '2024-09-01', 
      status: 'No Show', 
      type: 'Consultation', 
      room: '102',
      duration: '30 min',
      phone: '(555) 567-8901',
      notes: 'Patient did not arrive'
    },
    { 
      id: 6, 
      patient: 'Michael Chen', 
      doctor: 'Dr. Garcia', 
      time: '11:15', 
      date: '2024-09-01', 
      status: 'Confirmed', 
      type: 'Emergency', 
      room: 'ER-2',
      duration: '60 min',
      phone: '(555) 678-9012',
      notes: 'Emergency consultation'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Appointments' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'no-show', label: 'No Show' }
  ];

  // Filter appointments based on search term, selected filter, and date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         appointment.status.toLowerCase().replace(' ', '-') === selectedFilter;
    
    const matchesDate = appointment.date === selectedDate;
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  const stats = {
    total: appointments.filter(a => a.date === selectedDate).length,
    confirmed: appointments.filter(a => a.date === selectedDate && a.status === 'Confirmed').length,
    pending: appointments.filter(a => a.date === selectedDate && a.status === 'Pending').length,
    completed: appointments.filter(a => a.date === selectedDate && a.status === 'Completed').length,
    noShow: appointments.filter(a => a.date === selectedDate && a.status === 'No Show').length
  };

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color.replace('text-', 'text-').replace('-600', '-500')}`} />
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'No Show': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-2">Monitor and manage all patient appointments across the facility</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Export Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => changeDate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{formatDate(selectedDate)}</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button 
            onClick={() => changeDate(1)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Total Appointments" value={stats.total} color="text-blue-600" icon={Calendar} />
        <StatCard title="Confirmed" value={stats.confirmed} color="text-green-600" icon={UserCheck} />
        <StatCard title="Pending" value={stats.pending} color="text-yellow-600" icon={Clock} />
        <StatCard title="Completed" value={stats.completed} color="text-gray-600" icon={Users} />
        <StatCard title="No Shows" value={stats.noShow} color="text-red-600" icon={AlertCircle} />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient, doctor, or room..."
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAppointments.length} of {stats.total} appointments for {formatDate(selectedDate)}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{appointment.time}</div>
                    <div className="text-sm text-gray-500">{appointment.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{appointment.patient}</div>
                    <div className="text-sm text-gray-500">{appointment.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{appointment.doctor}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-600">{appointment.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-sm">{appointment.room}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointment.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Appointment"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500">No appointments match your search criteria for this date.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Peak Hours:</span>
              <span className="font-medium">10:00 AM - 2:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Busiest Doctor:</span>
              <span className="font-medium">Dr. Brown</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Rooms:</span>
              <span className="font-medium">4 of 12</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Alerts</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">3 patients running late</span>
            </div>
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">1 no-show today</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">2 emergency slots used</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
              Add Emergency Slot
            </button>
            <button className="w-full text-left p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
              Send Reminders
            </button>
            <button className="w-full text-left p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
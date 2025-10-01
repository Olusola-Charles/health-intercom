// src/pages/doctor/DoctorOverview.jsx
import React from 'react';
import {
  Calendar, Users, TrendingUp, Star, Stethoscope, Clock,
  Plus, FileText, Pill, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const DoctorOverview = () => {
  const { user } = useAuth();

  // Sample data - in real app, this would come from API
  const todaySchedule = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00', type: 'Consultation', status: 'confirmed', duration: '30 min' },
    { id: 2, patient: 'Michael Chen', time: '09:30', type: 'Follow-up', status: 'confirmed', duration: '20 min' },
    { id: 3, patient: 'Emma Davis', time: '10:00', type: 'Check-up', status: 'in-progress', duration: '45 min' },
    { id: 4, patient: 'James Wilson', time: '11:00', type: 'Consultation', status: 'pending', duration: '30 min' },
    { id: 5, patient: 'Lisa Anderson', time: '14:00', type: 'Surgery Consult', status: 'confirmed', duration: '60 min' },
    { id: 6, patient: 'David Brown', time: '15:30', type: 'Follow-up', status: 'confirmed', duration: '20 min' }
  ];

  const recentNotes = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      date: '2024-08-28',
      type: 'Progress Note',
      content: 'Blood pressure well controlled on current medication. Continue current regimen.'
    },
    {
      id: 2,
      patient: 'Michael Chen',
      date: '2024-08-30',
      type: 'Treatment Plan',
      content: 'HbA1c levels elevated. Adjusted insulin dosage and scheduled nutrition counseling.'
    },
    {
      id: 3,
      patient: 'Emma Davis',
      date: '2024-08-29',
      type: 'Follow-up',
      content: 'Migraine frequency reduced significantly. Patient responding well to preventive therapy.'
    }
  ];

  const stats = {
    todayAppointments: todaySchedule.length,
    totalPatients: 45,
    completedToday: 3,
    pendingResults: 5,
    averageRating: 4.8,
    thisWeekAppointments: 28
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend > 0 ? '+' : ''}{trend}% this week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Good morning, {user?.name || 'Doctor'}!</h2>
            <p className="text-blue-100 text-lg">{user?.specialty} • Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{stats.todayAppointments} appointments today</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{stats.totalPatients} active patients</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Stethoscope className="w-24 h-24 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Appointments" 
          value={stats.todayAppointments} 
          subtitle="6 scheduled"
          icon={Calendar} 
          color="bg-blue-500"
          trend={12}
        />
        <StatCard 
          title="Completed Today" 
          value={stats.completedToday} 
          subtitle="3 remaining"
          icon={CheckCircle} 
          color="bg-green-500"
          trend={8}
        />
        <StatCard 
          title="Active Patients" 
          value={stats.totalPatients} 
          subtitle="Under your care"
          icon={Users} 
          color="bg-purple-500"
        />
        <StatCard 
          title="Patient Rating" 
          value={stats.averageRating} 
          subtitle="⭐ Average rating"
          icon={Star} 
          color="bg-orange-500"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-600" />
              Today's Schedule
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {todaySchedule.slice(0, 5).map(appointment => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-bold text-blue-600">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.duration}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patient Notes */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <FileText className="w-6 h-6 mr-2 text-green-600" />
              Recent Notes
            </h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">Add Note</button>
          </div>
          <div className="space-y-4">
            {recentNotes.map(note => (
              <div key={note.id} className="border-l-4 border-blue-200 pl-4 py-3 bg-blue-50 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-blue-900">{note.patient}</p>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{note.type}</span>
                </div>
                <p className="text-sm text-blue-800 mb-2">{note.content}</p>
                <p className="text-xs text-blue-600">{note.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
            <Plus className="w-8 h-8 text-blue-600" />
            <span className="font-medium text-blue-600">New Patient</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
            <Calendar className="w-8 h-8 text-green-600" />
            <span className="font-medium text-green-600">Schedule</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="font-medium text-purple-600">Write Note</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all">
            <Pill className="w-8 h-8 text-orange-600" />
            <span className="font-medium text-orange-600">Prescribe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorOverview;
// src/pages/doctor/DoctorDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Users, FileText, Activity, Heart, 
  Stethoscope, Pill, ClipboardList, MessageSquare, 
  Bell, Search, Filter, Plus, Eye, Edit, Phone,
  Mail, MapPin, Star, TrendingUp, AlertCircle,
  ChevronRight, CheckCircle, XCircle, User
} from 'lucide-react';
import Logo from '../../components/common/Logo';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in real app, this would come from API
  const todaySchedule = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00', type: 'Consultation', status: 'confirmed', duration: '30 min' },
    { id: 2, patient: 'Michael Chen', time: '09:30', type: 'Follow-up', status: 'confirmed', duration: '20 min' },
    { id: 3, patient: 'Emma Davis', time: '10:00', type: 'Check-up', status: 'in-progress', duration: '45 min' },
    { id: 4, patient: 'James Wilson', time: '11:00', type: 'Consultation', status: 'pending', duration: '30 min' },
    { id: 5, patient: 'Lisa Anderson', time: '14:00', type: 'Surgery Consult', status: 'confirmed', duration: '60 min' },
    { id: 6, patient: 'David Brown', time: '15:30', type: 'Follow-up', status: 'confirmed', duration: '20 min' }
  ];

  const myPatients = [
    {
      id: 1, 
      name: 'Sarah Johnson', 
      age: 34, 
      condition: 'Hypertension', 
      lastVisit: '2024-08-28',
      nextAppointment: '2024-09-05',
      status: 'Stable',
      phone: '(555) 123-4567',
      email: 'sarah.j@email.com'
    },
    {
      id: 2, 
      name: 'Michael Chen', 
      age: 45, 
      condition: 'Diabetes Type 2', 
      lastVisit: '2024-08-30',
      nextAppointment: '2024-09-01',
      status: 'Needs Attention',
      phone: '(555) 234-5678',
      email: 'michael.c@email.com'
    },
    {
      id: 3, 
      name: 'Emma Davis', 
      age: 28, 
      condition: 'Migraine', 
      lastVisit: '2024-08-29',
      nextAppointment: '2024-09-12',
      status: 'Improved',
      phone: '(555) 345-6789',
      email: 'emma.d@email.com'
    },
    {
      id: 4, 
      name: 'James Wilson', 
      age: 52, 
      condition: 'Arthritis', 
      lastVisit: '2024-08-25',
      nextAppointment: '2024-09-01',
      status: 'Stable',
      phone: '(555) 456-7890',
      email: 'james.w@email.com'
    }
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
    totalPatients: myPatients.length,
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

  const OverviewContent = () => (
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

  const PatientsContent = () => (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myPatients.map(patient => (
          <div key={patient.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{patient.name}</h3>
                  <p className="text-gray-600">Age {patient.age}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                patient.status === 'Stable' ? 'bg-green-100 text-green-700' :
                patient.status === 'Needs Attention' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {patient.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Condition:</span>
                <span className="font-medium">{patient.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Visit:</span>
                <span className="font-medium">{patient.lastVisit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Next Appointment:</span>
                <span className="font-medium text-blue-600">{patient.nextAppointment}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Records">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Call Patient">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg" title="Send Message">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ScheduleContent = () => (
    <div className="space-y-6">
      {/* Schedule Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Schedule</h2>
            <p className="text-gray-600">Manage your appointments and availability</p>
          </div>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar className="w-5 h-5" />
              <span>View Calendar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              <span>Block Time</span>
            </button>
          </div>
        </div>
      </div>

      {/* Today's Detailed Schedule */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold">Today's Appointments</h3>
          <p className="text-gray-600">September 1, 2024 • {todaySchedule.length} appointments scheduled</p>
        </div>
        <div className="divide-y divide-gray-200">
          {todaySchedule.map(appointment => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{appointment.time}</p>
                    <p className="text-sm text-gray-500">{appointment.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{appointment.patient}</h4>
                    <p className="text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Patient">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Start Appointment">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Cancel">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NotesContent = () => (
    <div className="space-y-6">
      {/* Notes Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clinical Notes</h2>
            <p className="text-gray-600">Patient notes, treatment plans, and follow-ups</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-5 h-5" />
            <span>New Note</span>
          </button>
        </div>
      </div>

      {/* Recent Notes */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">Recent Clinical Notes</h3>
        <div className="space-y-6">
          {recentNotes.map(note => (
            <div key={note.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{note.patient}</h4>
                    <p className="text-sm text-gray-600">{note.date} • {note.type}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Full Note">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Edit Note">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Note Templates */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">Quick Note Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
            <h4 className="font-semibold text-blue-600 mb-2">Progress Note</h4>
            <p className="text-sm text-gray-600">Standard progress documentation</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left">
            <h4 className="font-semibold text-green-600 mb-2">Treatment Plan</h4>
            <p className="text-sm text-gray-600">Detailed treatment planning</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left">
            <h4 className="font-semibold text-purple-600 mb-2">Follow-up</h4>
            <p className="text-sm text-gray-600">Schedule and track follow-ups</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Logo size="sm" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Doctor Portal</h1>
                <p className="text-sm text-gray-600">{user?.specialty || 'Medical Practice'}</p>
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
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-green-600" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{user?.name || 'Doctor'}</p>
                  <p className="text-sm text-gray-600">{user?.specialty || 'Medical Doctor'}</p>
                </div>
              </div>
              
              <button
                onClick={onLogout}
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
            {[
              { id: 'overview', label: 'Dashboard', icon: Activity },
              { id: 'patients', label: 'My Patients', icon: Users },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'notes', label: 'Clinical Notes', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
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
        {activeTab === 'overview' && <OverviewContent />}
        {activeTab === 'patients' && <PatientsContent />}
        {activeTab === 'schedule' && <ScheduleContent />}
        {activeTab === 'notes' && <NotesContent />}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Messages Center</h3>
            <p className="text-gray-600">Secure messaging with patients and healthcare team</p>
          </div>
        )}
      </main>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Lab results ready for Sarah Johnson</p>
                <p className="text-xs text-gray-600">10 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Michael Chen checked in for appointment</p>
                <p className="text-xs text-gray-600">25 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Prescription refill request pending</p>
                <p className="text-xs text-gray-600">1 hour ago</p>
              </div>
            </div>
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

export default DoctorDashboard;
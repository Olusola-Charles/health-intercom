// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Activity, TrendingUp, AlertCircle, UserCheck, 
  Clock, DollarSign, FileText, Settings, Bell, Search, Filter, 
  MoreVertical, Eye, Edit, Trash2, Plus, Download, Shield,
  Hospital, Stethoscope, HeartHandshake
} from 'lucide-react';
import Logo from '../../components/common/Logo';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - in real app, this would come from API
  const stats = {
    totalPatients: 2847,
    totalDoctors: 156,
    totalStaff: 324,
    todayAppointments: 89,
    pendingAppointments: 23,
    completedAppointments: 156,
    revenue: 127450,
    occupancyRate: 76,
    systemUptime: 99.9
  };

  const recentPatients = [
    { id: 1, name: 'Sarah Johnson', age: 34, lastVisit: '2024-09-01', status: 'Active', doctor: 'Dr. Smith', phone: '(555) 123-4567' },
    { id: 2, name: 'Michael Chen', age: 45, lastVisit: '2024-08-30', status: 'Follow-up', doctor: 'Dr. Williams', phone: '(555) 234-5678' },
    { id: 3, name: 'Emma Davis', age: 28, lastVisit: '2024-08-29', status: 'Discharged', doctor: 'Dr. Brown', phone: '(555) 345-6789' },
    { id: 4, name: 'James Wilson', age: 52, lastVisit: '2024-08-28', status: 'Active', doctor: 'Dr. Taylor', phone: '(555) 456-7890' },
    { id: 5, name: 'Lisa Anderson', age: 37, lastVisit: '2024-08-27', status: 'Follow-up', doctor: 'Dr. Miller', phone: '(555) 567-8901' }
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '09:00', date: '2024-09-01', status: 'Confirmed', type: 'Consultation', room: '101' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Williams', time: '10:30', date: '2024-09-01', status: 'Pending', type: 'Follow-up', room: '203' },
    { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Brown', time: '14:00', date: '2024-09-01', status: 'In Progress', type: 'Surgery', room: 'OR-1' },
    { id: 4, patient: 'Alice Davis', doctor: 'Dr. Taylor', time: '15:30', date: '2024-09-01', status: 'Completed', type: 'Check-up', room: '105' }
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Cardiology', patients: 45, rating: 4.9, status: 'Available', email: 'dr.smith@hic.com', phone: '(555) 101-1001' },
    { id: 2, name: 'Dr. Michael Williams', specialty: 'Neurology', patients: 38, rating: 4.8, status: 'Busy', email: 'dr.williams@hic.com', phone: '(555) 101-1002' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Pediatrics', patients: 52, rating: 4.9, status: 'Available', email: 'dr.brown@hic.com', phone: '(555) 101-1003' },
    { id: 4, name: 'Dr. David Taylor', specialty: 'Orthopedics', patients: 41, rating: 4.7, status: 'Off Duty', email: 'dr.taylor@hic.com', phone: '(555) 101-1004' },
    { id: 5, name: 'Dr. Lisa Miller', specialty: 'Dermatology', patients: 33, rating: 4.8, status: 'Available', email: 'dr.miller@hic.com', phone: '(555) 101-1005' }
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', title: 'Server Maintenance Scheduled', message: 'System will be offline from 2:00 AM - 4:00 AM tomorrow', time: '2 hours ago' },
    { id: 2, type: 'info', title: 'High System Load Detected', message: 'Consider upgrading server resources during peak hours', time: '4 hours ago' },
    { id: 3, type: 'success', title: 'Backup Completed Successfully', message: 'Daily backup completed at 3:00 AM', time: '6 hours ago' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
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
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value={stats.totalPatients.toLocaleString()} 
          change={8.2}
          icon={Users} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Doctors" 
          value={stats.totalDoctors} 
          change={3.1}
          icon={UserCheck} 
          color="bg-green-500"
        />
        <StatCard 
          title="Today's Appointments" 
          value={stats.todayAppointments} 
          change={-2.4}
          icon={Calendar} 
          color="bg-purple-500"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          change={12.5}
          icon={DollarSign} 
          color="bg-orange-500"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="System Uptime" 
          value={`${stats.systemUptime}%`} 
          subtitle="Last 30 days"
          icon={Activity} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="Bed Occupancy" 
          value={`${stats.occupancyRate}%`} 
          subtitle="Current capacity"
          icon={Hospital} 
          color="bg-indigo-500"
        />
        <StatCard 
          title="Total Staff" 
          value={stats.totalStaff} 
          subtitle="All departments"
          icon={HeartHandshake} 
          color="bg-pink-500"
        />
      </div>

      {/* Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Patient Registrations</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentPatients.slice(0, 4).map(patient => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-blue-600">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{patient.name}</p>
                    <p className="text-sm text-gray-600">Age {patient.age} • {patient.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Active' ? 'bg-green-100 text-green-700' :
                    patient.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {patient.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold mb-6">Quick Administrative Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
              <Plus className="w-6 h-6 text-blue-600" />
              <span className="font-medium">Add Staff Member</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
              <UserCheck className="w-6 h-6 text-green-600" />
              <span className="font-medium">Manage Doctors</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
              <FileText className="w-6 h-6 text-purple-600" />
              <span className="font-medium">System Reports</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all">
              <Settings className="w-6 h-6 text-orange-600" />
              <span className="font-medium">System Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">System Alerts & Notifications</h3>
        <div className="space-y-4">
          {systemAlerts.map(alert => (
            <div key={alert.id} className={`flex items-start space-x-4 p-4 rounded-lg border-l-4 ${
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
              'bg-green-50 border-green-400'
            }`}>
              <AlertCircle className={`w-6 h-6 mt-0.5 ${
                alert.type === 'warning' ? 'text-yellow-600' :
                alert.type === 'info' ? 'text-blue-600' :
                'text-green-600'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`font-semibold ${
                    alert.type === 'warning' ? 'text-yellow-800' :
                    alert.type === 'info' ? 'text-blue-800' :
                    'text-green-800'
                  }`}>{alert.title}</p>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className={`text-sm mt-1 ${
                  alert.type === 'warning' ? 'text-yellow-700' :
                  alert.type === 'info' ? 'text-blue-700' :
                  'text-green-700'
                }`}>{alert.message}</p>
              </div>
            </div>
          ))}
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
              placeholder="Search patients by name, ID, or phone..."
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

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assigned Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600 text-sm">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <span className="font-medium">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4 text-gray-900">{patient.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-700' :
                      patient.status === 'Follow-up' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Edit Patient">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete Patient">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const DoctorsContent = () => (
    <div className="space-y-6">
      {/* Add Doctor Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Staff Management</h2>
          <p className="text-gray-600">Manage doctors, schedules, and specialties</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-1">{doctor.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
              <p className="text-xs text-gray-500 mb-3">{doctor.email}</p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                <span>{doctor.patients} patients</span>
                <span>★ {doctor.rating}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                doctor.status === 'Available' ? 'bg-green-100 text-green-700' :
                doctor.status === 'Busy' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {doctor.status}
              </span>
            </div>
            <div className="mt-6 pt-4 border-t space-y-2">
              <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2">
                View Profile & Schedule
              </button>
              <div className="flex justify-between space-x-2">
                <button className="flex-1 text-green-600 hover:bg-green-50 text-sm py-2 px-3 rounded">
                  Edit
                </button>
                <button className="flex-1 text-orange-600 hover:bg-orange-50 text-sm py-2 px-3 rounded">
                  Schedule
                </button>
                <button className="text-gray-400 hover:text-gray-600 p-2">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AppointmentsContent = () => (
    <div className="space-y-6">
      {/* Appointments Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
          <p className="text-gray-600">Monitor and manage all patient appointments</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5" />
            <span>Export Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Calendar className="w-5 h-5" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Total</p>
              <p className="text-2xl font-bold">{stats.todayAppointments}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingAppointments}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedAppointments}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">No Shows</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold">Today's Schedule Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Room</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map(appointment => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{appointment.time}</td>
                  <td className="px-6 py-4">{appointment.patient}</td>
                  <td className="px-6 py-4">{appointment.doctor}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{appointment.type}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{appointment.room}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      appointment.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Edit Appointment">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg" title="More Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-8">
      {/* System Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">User Management</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Manage user accounts, roles, and permissions</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Manage Users
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Security Settings</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Configure authentication and security policies</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Security Config
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">System Reports</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Generate and view system analytics reports</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            View Reports
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold">System Monitoring</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Monitor system performance and health</p>
          <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            System Status
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold">Backup & Recovery</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Manage data backups and system recovery</p>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Backup Settings
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold">General Settings</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Configure general system preferences</p>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            System Config
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h3 className="text-xl font-bold mb-6">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Server Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Server Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Backup</span>
                <span className="font-medium">3:00 AM Today</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database Size</span>
                <span className="font-medium">2.4 GB</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">System Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Records</span>
                <span className="font-medium">{(stats.totalPatients + stats.totalDoctors).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Transactions</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Sessions</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </div>
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
              { id: 'overview', label: 'Dashboard Overview', icon: Activity },
              { id: 'patients', label: 'Patient Management', icon: Users },
              { id: 'doctors', label: 'Medical Staff', icon: UserCheck },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'settings', label: 'System Settings', icon: Settings }
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
        {activeTab === 'doctors' && <DoctorsContent />}
        {activeTab === 'appointments' && <AppointmentsContent />}
        {activeTab === 'settings' && <SettingsContent />}
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

export default AdminDashboard;
          
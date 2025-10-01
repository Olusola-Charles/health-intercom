// src/pages/admin/AdminOverview.jsx
import React from 'react';
import {
  Users, Calendar, TrendingUp, DollarSign, Activity, 
  Hospital, HeartHandshake, UserCheck, Plus, AlertCircle
} from 'lucide-react';

const AdminOverview = () => {
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
    { id: 4, name: 'James Wilson', age: 52, lastVisit: '2024-08-28', status: 'Active', doctor: 'Dr. Taylor', phone: '(555) 456-7890' }
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

  return (
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
            {recentPatients.map(patient => (
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
              <Calendar className="w-6 h-6 text-purple-600" />
              <span className="font-medium">System Reports</span>
            </button>
            <button className="flex items-center space-x-3 p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all">
              <Activity className="w-6 h-6 text-orange-600" />
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
};

export default AdminOverview;
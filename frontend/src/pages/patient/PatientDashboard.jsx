// src/pages/patient/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Heart, Activity, FileText, User, 
  Phone, Mail, MapPin, Bell, MessageSquare, Pill,
  Download, Eye, Plus, ChevronRight, AlertCircle,
  CheckCircle, Star, TrendingUp, Shield, Stethoscope
} from 'lucide-react';
import Logo from '../../components/common/Logo';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const navigate = useNavigate();
  // Sample patient data - in real app, this would come from API
  const patientInfo = {
    name: user?.name || 'John Doe',
    age: user?.age || 35,
    email: user?.email || 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Dothan, AL 36301',
    bloodType: 'O+',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    insuranceProvider: 'Blue Cross Blue Shield',
    memberID: 'BC123456789'
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      date: '2024-09-05',
      time: '10:30 AM',
      type: 'Follow-up',
      location: 'Heart Center - Room 201',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Williams',
      specialty: 'General Practice',
      date: '2024-09-12',
      time: '2:00 PM',
      type: 'Annual Check-up',
      location: 'Main Clinic - Room 105',
      status: 'Confirmed'
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      specialty: 'Dermatology',
      date: '2024-09-18',
      time: '11:15 AM',
      type: 'Consultation',
      location: 'Dermatology Wing - Room 301',
      status: 'Pending'
    }
  ];

  const recentVisits = [
    {
      id: 1,
      doctor: 'Dr. Sarah Smith',
      date: '2024-08-15',
      type: 'Cardiology Follow-up',
      notes: 'Blood pressure stable, continue current medication',
      status: 'Completed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Williams',
      date: '2024-08-01',
      type: 'Lab Results Review',
      notes: 'All lab results within normal range',
      status: 'Completed'
    },
    {
      id: 3,
      doctor: 'Dr. Jennifer Davis',
      date: '2024-07-20',
      type: 'Physical Therapy',
      notes: 'Good progress with mobility exercises',
      status: 'Completed'
    }
  ];

  const medications = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Smith',
      startDate: '2024-06-01',
      endDate: '2024-12-01',
      refillsRemaining: 3
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Michael Williams',
      startDate: '2024-05-15',
      endDate: '2024-11-15',
      refillsRemaining: 1
    },
    {
      id: 3,
      name: 'Vitamin D3',
      dosage: '2000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Michael Williams',
      startDate: '2024-07-01',
      endDate: '2025-01-01',
      refillsRemaining: 5
    }
  ];

  const labResults = [
    {
      id: 1,
      testName: 'Complete Blood Count',
      date: '2024-08-28',
      status: 'Normal',
      doctor: 'Dr. Michael Williams',
      downloadUrl: '#'
    },
    {
      id: 2,
      testName: 'Lipid Panel',
      date: '2024-08-28',
      status: 'Normal',
      doctor: 'Dr. Sarah Smith',
      downloadUrl: '#'
    },
    {
      id: 3,
      testName: 'HbA1c',
      date: '2024-08-15',
      status: 'Slightly Elevated',
      doctor: 'Dr. Michael Williams',
      downloadUrl: '#'
    }
  ];

  const vitalSigns = {
    bloodPressure: { value: '120/80', date: '2024-08-15', status: 'Normal' },
    heartRate: { value: '72', date: '2024-08-15', status: 'Normal' },
    temperature: { value: '98.6°F', date: '2024-08-15', status: 'Normal' },
    weight: { value: '175 lbs', date: '2024-08-15', status: 'Stable' },
    height: { value: '5\'10"', date: '2024-01-15', status: 'Stable' }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, action }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      {action && (
        <div className="mt-4 pt-4 border-t">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            {action}
          </button>
        </div>
      )}
    </div>
  );

  const OverviewContent = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Hello, {patientInfo.name}!</h2>
            <p className="text-blue-100 text-lg">Welcome to your health dashboard</p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{upcomingAppointments.length} upcoming appointments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Health status: Good</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Heart className="w-24 h-24 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Next Appointment" 
          value={upcomingAppointments[0]?.date || 'None'} 
          subtitle={upcomingAppointments[0]?.doctor || ''}
          icon={Calendar} 
          color="bg-blue-500"
          action="View Details"
          onClick={() => navigate('/patient/doctors')}
        />
        <StatCard 
          title="Active Medications" 
          value={medications.length} 
          subtitle="Current prescriptions"
          icon={Pill} 
          color="bg-green-500"
          action="Manage Meds"
        />
        <StatCard 
          title="Recent Lab Results" 
          value={labResults.filter(lab => lab.status === 'Normal').length} 
          subtitle={`of ${labResults.length} normal`}
          icon={FileText} 
          color="bg-purple-500"
          action="View Results"
        />
        <StatCard 
          title="Health Score" 
          value="85%" 
          subtitle="Based on recent data"
          icon={Activity} 
          color="bg-orange-500"
          action="View Trends"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Upcoming Appointments
            </h3>
            <button 
              onClick={() => navigate('/patient/doctors')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Schedule New
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 3).map(appointment => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-bold text-blue-600">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-xs text-gray-500">{appointment.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 mt-2 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Activity className="w-6 h-6 mr-2 text-green-600" />
              Recent Activity
            </h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentVisits.slice(0, 3).map(visit => (
              <div key={visit.id} className="border-l-4 border-green-200 pl-4 py-3 bg-green-50 rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-green-900">{visit.doctor}</p>
                  <span className="text-xs text-green-600">{visit.date}</span>
                </div>
                <p className="text-sm text-green-800 font-medium mb-1">{visit.type}</p>
                <p className="text-sm text-green-700">{visit.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Vital Signs */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Heart className="w-6 h-6 mr-2 text-red-500" />
          Current Vital Signs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(vitalSigns).map(([key, vital]) => (
            <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
              <p className="text-2xl font-bold mt-1">{vital.value}</p>
              <p className="text-xs text-gray-500 mt-1">{vital.date}</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium mt-2 inline-block ${
                vital.status === 'Normal' || vital.status === 'Stable' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {vital.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/patient/doctors')}
            className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="font-medium text-blue-600">Book Appointment</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all">
            <MessageSquare className="w-8 h-8 text-green-600" />
            <span className="font-medium text-green-600">Message Doctor</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
            <FileText className="w-8 h-8 text-purple-600" />
            <span className="font-medium text-purple-600">Request Records</span>
          </button>
          <button className="flex flex-col items-center space-y-3 p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all">
            <Pill className="w-8 h-8 text-orange-600" />
            <span className="font-medium text-orange-600">Refill Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );

  const AppointmentsContent = () => (
    <div className="space-y-6">
      {/* Appointments Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
            <p className="text-gray-600">Manage your upcoming and past appointments</p>
          </div>
          <button 
            onClick={() => navigate('/patient/doctors')}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold">Upcoming Appointments</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-blue-600">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{appointment.doctor}</h4>
                    <p className="text-gray-600">{appointment.specialty}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {appointment.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Reschedule">
                      <Calendar className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold">Recent Visits</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentVisits.map(visit => (
            <div key={visit.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-600">{visit.date}</p>
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-1" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{visit.doctor}</h4>
                    <p className="text-gray-600">{visit.type}</p>
                    <p className="text-sm text-gray-700 mt-2 bg-gray-100 p-2 rounded italic">{visit.notes}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Summary">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Download Report">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MedicationsContent = () => (
    <div className="space-y-6">
      {/* Medications Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Medications</h2>
            <p className="text-gray-600">Current prescriptions and medication history</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-5 h-5" />
            <span>Request Refill</span>
          </button>
        </div>
      </div>

      {/* Current Medications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medications.map(medication => (
          <div key={medication.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Pill className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{medication.name}</h3>
                  <p className="text-gray-600">{medication.dosage}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                medication.refillsRemaining > 2 ? 'bg-green-100 text-green-700' :
                medication.refillsRemaining > 0 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {medication.refillsRemaining} refills left
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Frequency:</span>
                <span className="font-medium">{medication.frequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Prescribed by:</span>
                <span className="font-medium">{medication.prescribedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{medication.startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{medication.endDate}</span>
              </div>
            </div>
            
            <div className="flex justify-between pt-4 border-t">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
              <button className={`text-sm font-medium ${
                medication.refillsRemaining > 0 ? 'text-green-600 hover:text-green-700' : 'text-gray-400 cursor-not-allowed'
              }`}>
                Request Refill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RecordsContent = () => (
    <div className="space-y-6">
      {/* Records Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
            <p className="text-gray-600">Lab results, reports, and medical documents</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Download className="w-5 h-5" />
            <span>Download All</span>
          </button>
        </div>
      </div>

      {/* Lab Results */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold">Recent Lab Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Test Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ordered By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {labResults.map(result => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{result.testName}</td>
                  <td className="px-6 py-4 text-gray-600">{result.date}</td>
                  <td className="px-6 py-4 text-gray-600">{result.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.status === 'Normal' ? 'bg-green-100 text-green-700' :
                      result.status.includes('Elevated') ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Results">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Basic Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Full Name:</span>
                <span className="font-medium">{patientInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{patientInfo.age}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Blood Type:</span>
                <span className="font-medium">{patientInfo.bloodType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{patientInfo.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{patientInfo.phone}</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Insurance & Emergency</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Insurance:</span>
                <span className="font-medium">{patientInfo.insuranceProvider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member ID:</span>
                <span className="font-medium">{patientInfo.memberID}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Emergency Contact:</span>
                <span className="font-medium">{patientInfo.emergencyContact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium text-right">{patientInfo.address}</span>
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
                <h1 className="text-xl font-bold text-gray-900">Patient Portal</h1>
                <p className="text-sm text-gray-600">Your Personal Health Dashboard</p>
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
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{patientInfo.name}</p>
                  <p className="text-sm text-gray-600">Patient</p>
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
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'medications', label: 'Medications', icon: Pill },
              { id: 'records', label: 'Medical Records', icon: FileText },
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
        {activeTab === 'appointments' && <AppointmentsContent />}
        {activeTab === 'medications' && <MedicationsContent />}
        {activeTab === 'records' && <RecordsContent />}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Messaging</h3>
            <p className="text-gray-600">Communicate securely with your healthcare team</p>
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
                <p className="text-sm font-medium">Appointment reminder: Dr. Smith tomorrow</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Lab results are ready for review</p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Prescription refill approved</p>
                <p className="text-xs text-gray-600">2 days ago</p>
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

export default PatientDashboard;
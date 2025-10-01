import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, Pill, Heart, Activity, Phone, Mail, Download, Eye, Plus, Bell, Settings, AlertTriangle, CheckCircle } from 'lucide-react';

const PatientOverview = ({ user = { name: 'John Doe', email: 'john.doe@email.com' } }) => {
  const [showBooking, setShowBooking] = useState(false);

  // Mock patient data
  const patientData = {
    profile: {
      id: 'P001',
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      bloodType: 'O+',
      allergies: ['Penicillin', 'Peanuts'],
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '(555) 987-6543'
      }
    },
    upcomingAppointments: [
      {
        id: 1,
        date: '2024-12-20',
        time: '10:00 AM',
        doctor: 'Dr. Sarah Smith',
        specialty: 'Cardiology',
        type: 'Follow-up',
        status: 'confirmed',
        location: 'Room 201'
      },
      {
        id: 2,
        date: '2024-12-25',
        time: '2:30 PM',
        doctor: 'Dr. Michael Johnson',
        specialty: 'General Practice',
        type: 'Annual Check-up',
        status: 'confirmed',
        location: 'Room 105'
      }
    ],
    recentTestResults: [
      {
        id: 1,
        date: '2024-12-15',
        test: 'Blood Panel',
        doctor: 'Dr. Sarah Smith',
        status: 'completed',
        results: 'Normal ranges',
        urgent: false
      },
      {
        id: 2,
        date: '2024-12-10',
        test: 'EKG',
        doctor: 'Dr. Sarah Smith',
        status: 'completed',
        results: 'Normal rhythm',
        urgent: false
      },
      {
        id: 3,
        date: '2024-12-08',
        test: 'Chest X-Ray',
        doctor: 'Dr. Michael Johnson',
        status: 'pending',
        results: 'Results pending review',
        urgent: true
      }
    ],
    activePrescriptions: [
      {
        id: 1,
        medication: 'Lisinopril 10mg',
        dosage: 'Once daily',
        prescribed: '2024-01-15',
        refillsLeft: 3,
        daysRemaining: 15,
        lowStock: true
      },
      {
        id: 2,
        medication: 'Metformin 500mg',
        dosage: 'Twice daily with meals',
        prescribed: '2024-02-01',
        refillsLeft: 5,
        daysRemaining: 45,
        lowStock: false
      }
    ],
    vitalSigns: {
      lastVisit: '2024-12-15',
      bloodPressure: '128/82',
      heartRate: '72 bpm',
      weight: '185 lbs',
      temperature: '98.6°F'
    },
    healthAlerts: [
      {
        id: 1,
        type: 'prescription',
        message: 'Lisinopril refill needed within 15 days',
        urgent: true
      },
      {
        id: 2,
        type: 'appointment',
        message: 'Annual flu shot recommended',
        urgent: false
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {patientData.profile.name}!</h1>
        <p className="opacity-90">Here's your health summary for today</p>
      </div>

      {/* Health Alerts */}
      {patientData.healthAlerts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Bell className="text-orange-500" size={20} />
            Health Alerts
          </h2>
          <div className="space-y-2">
            {patientData.healthAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${
                alert.urgent ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex items-center gap-2">
                  {alert.urgent ? (
                    <AlertTriangle className="text-red-600" size={16} />
                  ) : (
                    <Bell className="text-yellow-600" size={16} />
                  )}
                  <span className={alert.urgent ? 'text-red-800' : 'text-yellow-800'}>
                    {alert.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-blue-600">{patientData.upcomingAppointments.length}</p>
            </div>
            <Calendar className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-green-600">{patientData.activePrescriptions.length}</p>
            </div>
            <Pill className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Test Results</p>
              <p className="text-2xl font-bold text-purple-600">{patientData.recentTestResults.length}</p>
            </div>
            <FileText className="text-purple-500" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Visit</p>
              <p className="text-lg font-bold text-gray-900">{patientData.vitalSigns.lastVisit}</p>
            </div>
            <Activity className="text-gray-500" size={24} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
            <button
              onClick={() => setShowBooking(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Book New
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {patientData.upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                    <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                    <p className="text-sm text-gray-500">{appointment.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {patientData.recentTestResults.map((result) => (
              <div key={result.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{result.test}</h4>
                      {result.urgent && <AlertTriangle className="text-red-500" size={16} />}
                    </div>
                    <p className="text-sm text-gray-600">Dr. {result.doctor}</p>
                    <p className="text-sm text-gray-500">{result.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                    {result.status === 'completed' && (
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medications and Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Prescriptions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Prescriptions</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Manage All
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {patientData.activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{prescription.medication}</h4>
                      {prescription.lowStock && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                          Low Stock
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{prescription.dosage}</p>
                    <p className="text-sm text-gray-500">
                      {prescription.daysRemaining} days remaining • {prescription.refillsLeft} refills left
                    </p>
                  </div>
                  {prescription.lowStock && (
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm">
                      Refill
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Vital Signs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Latest Vital Signs</h3>
            <p className="text-sm text-gray-500">From your last visit on {patientData.vitalSigns.lastVisit}</p>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold text-blue-600">{patientData.vitalSigns.bloodPressure}</div>
                <div className="text-sm text-gray-600">Blood Pressure</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold text-green-600">{patientData.vitalSigns.heartRate}</div>
                <div className="text-sm text-gray-600">Heart Rate</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold text-purple-600">{patientData.vitalSigns.weight}</div>
                <div className="text-sm text-gray-600">Weight</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-xl font-bold text-orange-600">{patientData.vitalSigns.temperature}</div>
                <div className="text-sm text-gray-600">Temperature</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowBooking(true)}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Calendar className="text-blue-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Book Appointment</div>
              <div className="text-sm text-gray-600">Schedule with your doctor</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FileText className="text-green-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">View Records</div>
              <div className="text-sm text-gray-600">Access medical history</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Pill className="text-purple-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Manage Medications</div>
              <div className="text-sm text-gray-600">Refills and reminders</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Mail className="text-orange-600" size={24} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Message Doctor</div>
              <div className="text-sm text-gray-600">Secure communication</div>
            </div>
          </button>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor/Specialty</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>Select doctor or specialty...</option>
                  <option>Dr. Sarah Smith - Cardiology</option>
                  <option>Dr. Michael Johnson - General Practice</option>
                  <option>Dr. Emily Chen - Dermatology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>Select reason...</option>
                  <option>Annual Check-up</option>
                  <option>Follow-up Visit</option>
                  <option>New Concern</option>
                  <option>Prescription Refill</option>
                  <option>Test Results Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your symptoms or concerns..."
                ></textarea>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientOverview;
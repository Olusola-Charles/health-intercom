import React, { useState } from 'react';
import { Search, Plus, Filter, Edit, Eye, Phone, Mail, Calendar, FileText, AlertTriangle, Clock, User, Activity, Heart, Pill, TestTube } from 'lucide-react';

const DoctorPatients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock patients data
  const [patients] = useState([
    {
      id: 'P001',
      name: 'John Doe',
      age: 58,
      gender: 'Male',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1965-06-15',
      address: '123 Main St, Springfield, IL 62701',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '(555) 987-6543'
      },
      insurance: 'Blue Cross Blue Shield',
      primaryDiagnosis: 'Essential Hypertension',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      allergies: ['Penicillin'],
      medications: [
        { name: 'Lisinopril 10mg', frequency: 'Daily', prescribedDate: '2024-01-15' },
        { name: 'Metformin 500mg', frequency: 'Twice daily', prescribedDate: '2024-02-01' }
      ],
      vitals: {
        lastVisit: '2024-12-15',
        bloodPressure: '128/82',
        heartRate: '72',
        weight: '185 lbs',
        height: '5\'10"',
        bmi: '26.8'
      },
      lastVisit: '2024-12-15',
      nextAppointment: '2025-03-15',
      status: 'stable',
      riskLevel: 'low',
      notes: 'Patient compliant with medications. BP well controlled.',
      recentTests: [
        { test: 'HbA1c', result: '6.8%', date: '2024-11-15', status: 'normal' },
        { test: 'Lipid Panel', result: 'Normal', date: '2024-10-20', status: 'normal' }
      ]
    },
    {
      id: 'P002',
      name: 'Emily Davis',
      age: 32,
      gender: 'Female',
      email: 'emily.davis@email.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1992-03-22',
      address: '456 Oak Ave, Springfield, IL 62702',
      emergencyContact: {
        name: 'Robert Davis',
        relationship: 'Father',
        phone: '(555) 876-5432'
      },
      insurance: 'Aetna',
      primaryDiagnosis: 'Anxiety Disorder',
      conditions: ['Generalized Anxiety Disorder', 'Costochondritis'],
      allergies: ['Shellfish', 'Latex'],
      medications: [
        { name: 'Sertraline 50mg', frequency: 'Daily', prescribedDate: '2024-03-10' },
        { name: 'Ibuprofen 600mg', frequency: 'As needed', prescribedDate: '2024-12-15' }
      ],
      vitals: {
        lastVisit: '2024-12-15',
        bloodPressure: '140/88',
        heartRate: '88',
        weight: '125 lbs',
        height: '5\'4"',
        bmi: '21.5'
      },
      lastVisit: '2024-12-15',
      nextAppointment: '2024-12-22',
      status: 'needs attention',
      riskLevel: 'medium',
      notes: 'New chest pain symptoms. Anxiety may be contributing factor.',
      recentTests: [
        { test: 'EKG', result: 'Normal', date: '2024-12-15', status: 'normal' },
        { test: 'Chest X-ray', result: 'Pending', date: '2024-12-15', status: 'pending' }
      ]
    },
    {
      id: 'P003',
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      email: 'michael.chen@email.com',
      phone: '(555) 345-6789',
      dateOfBirth: '1979-08-10',
      address: '789 Pine Rd, Springfield, IL 62703',
      emergencyContact: {
        name: 'Lisa Chen',
        relationship: 'Spouse',
        phone: '(555) 765-4321'
      },
      insurance: 'United Healthcare',
      primaryDiagnosis: 'Healthy',
      conditions: [],
      allergies: ['None known'],
      medications: [
        { name: 'Multivitamin', frequency: 'Daily', prescribedDate: '2024-01-01' }
      ],
      vitals: {
        lastVisit: '2024-12-14',
        bloodPressure: '118/76',
        heartRate: '65',
        weight: '175 lbs',
        height: '5\'9"',
        bmi: '25.8'
      },
      lastVisit: '2024-12-14',
      nextAppointment: '2025-12-14',
      status: 'healthy',
      riskLevel: 'low',
      notes: 'Annual physical completed. All parameters normal.',
      recentTests: [
        { test: 'Complete Blood Count', result: 'Normal', date: '2024-12-14', status: 'normal' },
        { test: 'Lipid Panel', result: 'Normal', date: '2024-12-14', status: 'normal' }
      ]
    },
    {
      id: 'P004',
      name: 'Sarah Wilson',
      age: 67,
      gender: 'Female',
      email: 'sarah.wilson@email.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1957-11-05',
      address: '321 Elm St, Springfield, IL 62704',
      emergencyContact: {
        name: 'David Wilson',
        relationship: 'Son',
        phone: '(555) 654-3210'
      },
      insurance: 'Medicare',
      primaryDiagnosis: 'Osteoarthritis',
      conditions: ['Osteoarthritis', 'Hypertension', 'Hyperlipidemia'],
      allergies: ['Codeine'],
      medications: [
        { name: 'Amlodipine 5mg', frequency: 'Daily', prescribedDate: '2024-01-20' },
        { name: 'Atorvastatin 20mg', frequency: 'Daily', prescribedDate: '2024-02-15' },
        { name: 'Acetaminophen 650mg', frequency: 'As needed', prescribedDate: '2024-03-01' }
      ],
      vitals: {
        lastVisit: '2024-12-10',
        bloodPressure: '135/85',
        heartRate: '78',
        weight: '142 lbs',
        height: '5\'2"',
        bmi: '26.0'
      },
      lastVisit: '2024-12-10',
      nextAppointment: '2025-01-10',
      status: 'monitoring',
      riskLevel: 'medium',
      notes: 'Joint pain increasing. Consider physical therapy referral.',
      recentTests: [
        { test: 'X-ray Knee', result: 'Moderate arthritis', date: '2024-11-28', status: 'abnormal' },
        { test: 'Lipid Panel', result: 'Improved', date: '2024-11-15', status: 'normal' }
      ]
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    insurance: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterBy === 'all' ||
      (filterBy === 'needs-attention' && patient.status === 'needs attention') ||
      (filterBy === 'stable' && patient.status === 'stable') ||
      (filterBy === 'high-risk' && patient.riskLevel === 'high') ||
      (filterBy === 'upcoming' && new Date(patient.nextAppointment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesFilter;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'lastVisit':
        return new Date(b.lastVisit) - new Date(a.lastVisit);
      case 'nextAppointment':
        return new Date(a.nextAppointment) - new Date(b.nextAppointment);
      case 'riskLevel':
        const riskOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return (riskOrder[b.riskLevel] || 0) - (riskOrder[a.riskLevel] || 0);
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs attention': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'monitoring': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleAddPatient = () => {
    const patient = {
      id: 'P' + String(patients.length + 1).padStart(3, '0'),
      ...newPatient,
      age: new Date().getFullYear() - new Date(newPatient.dateOfBirth).getFullYear(),
      conditions: [],
      allergies: [],
      medications: [],
      vitals: {},
      status: 'new',
      riskLevel: 'low',
      notes: 'New patient registration',
      recentTests: []
    };
    
    setShowAddPatient(false);
    setNewPatient({
      name: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      phone: '',
      address: '',
      insurance: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    });
  };

  const renderPatientOverview = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Patient ID</label>
                <p className="text-gray-900">{selectedPatient.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Age</label>
                <p className="text-gray-900">{selectedPatient.age} years</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
              <p className="text-gray-900">{selectedPatient.dateOfBirth}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Gender</label>
              <p className="text-gray-900">{selectedPatient.gender}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Address</label>
              <p className="text-gray-900">{selectedPatient.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Insurance</label>
              <p className="text-gray-900">{selectedPatient.insurance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="text-gray-900">{selectedPatient.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <p className="text-gray-900">{selectedPatient.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
              <div className="text-gray-900">
                <p>{selectedPatient.emergencyContact.name}</p>
                <p className="text-sm text-gray-600">{selectedPatient.emergencyContact.relationship}</p>
                <p className="text-sm text-gray-600">{selectedPatient.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>
            <div className="mt-1">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                {selectedPatient.status}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Risk Level</label>
            <p className={`font-medium ${getRiskColor(selectedPatient.riskLevel)}`}>
              {selectedPatient.riskLevel.toUpperCase()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Primary Diagnosis</label>
            <p className="text-gray-900">{selectedPatient.primaryDiagnosis}</p>
          </div>
        </div>
      </div>

      {/* Latest Vitals */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Vital Signs</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{selectedPatient.vitals.bloodPressure}</div>
            <div className="text-sm text-gray-600">Blood Pressure</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-green-600">{selectedPatient.vitals.heartRate}</div>
            <div className="text-sm text-gray-600">Heart Rate</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-purple-600">{selectedPatient.vitals.weight}</div>
            <div className="text-sm text-gray-600">Weight</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-orange-600">{selectedPatient.vitals.height}</div>
            <div className="text-sm text-gray-600">Height</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-red-600">{selectedPatient.vitals.bmi}</div>
            <div className="text-sm text-gray-600">BMI</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-2xl font-bold text-gray-600">{selectedPatient.vitals.lastVisit}</div>
            <div className="text-sm text-gray-600">Last Visit</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6">
      {/* Conditions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Conditions</h3>
        {selectedPatient.conditions.length > 0 ? (
          <div className="space-y-2">
            {selectedPatient.conditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-gray-900">{condition}</span>
                <span className="text-sm text-gray-500">Active</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No active conditions</p>
        )}
      </div>

      {/* Allergies */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h3>
        <div className="flex flex-wrap gap-2">
          {selectedPatient.allergies.map((allergy, index) => (
            <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {allergy}
            </span>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
        {selectedPatient.medications.length > 0 ? (
          <div className="space-y-3">
            {selectedPatient.medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                <div>
                  <div className="font-medium text-gray-900">{med.name}</div>
                  <div className="text-sm text-gray-600">{med.frequency}</div>
                </div>
                <div className="text-sm text-gray-500">
                  Prescribed: {med.prescribedDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No current medications</p>
        )}
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h3>
        {selectedPatient.recentTests.length > 0 ? (
          <div className="space-y-3">
            {selectedPatient.recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                <div>
                  <div className="font-medium text-gray-900">{test.test}</div>
                  <div className="text-sm text-gray-600">{test.result}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.status === 'normal' ? 'bg-green-100 text-green-800' :
                    test.status === 'abnormal' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status}
                  </span>
                  <span className="text-sm text-gray-500">{test.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent test results</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Patient List Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Patients</h2>
            <button
              onClick={() => setShowAddPatient(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {['all', 'needs-attention', 'stable', 'upcoming'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-2 py-1 rounded text-sm font-medium ${
                  filterBy === filter
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="name">Sort by Name</option>
            <option value="lastVisit">Sort by Last Visit</option>
            <option value="nextAppointment">Sort by Next Appointment</option>
            <option value="riskLevel">Sort by Risk Level</option>
          </select>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto">
          {sortedPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => {setSelectedPatient(patient); setActiveTab('overview');}}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedPatient?.id === patient.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age}y {patient.gender} • {patient.id}</p>
                </div>
                <div className="flex items-center gap-1">
                  {patient.status === 'needs attention' && (
                    <AlertTriangle size={16} className="text-yellow-500" />
                  )}
                  <span className={`w-3 h-3 rounded-full ${getRiskColor(patient.riskLevel).replace('text-', 'bg-')}`}></span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{patient.primaryDiagnosis}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last: {patient.lastVisit}</span>
                <span className={`px-2 py-1 rounded-full font-medium border ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={(e) => {e.stopPropagation();}}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Phone size={14} />
                </button>
                <button
                  onClick={(e) => {e.stopPropagation();}}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Mail size={14} />
                </button>
                <button
                  onClick={(e) => {e.stopPropagation();}}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Calendar size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedPatient ? (
          <>
            {/* Patient Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-600">{selectedPatient.age}y {selectedPatient.gender} • {selectedPatient.id}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                      {selectedPatient.status}
                    </span>
                    <span className={`font-medium ${getRiskColor(selectedPatient.riskLevel)}`}>
                      {selectedPatient.riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50">
                    <Phone size={20} />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50">
                    <Mail size={20} />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50">
                    <Calendar size={20} />
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                    New Note
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
              <div className="flex space-x-8 px-4">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'history', label: 'Medical History', icon: FileText },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'notes', label: 'Clinical Notes', icon: FileText }
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
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && renderPatientOverview()}
              {activeTab === 'history' && renderMedicalHistory()}
              {activeTab === 'appointments' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
                      <div>
                        <div className="font-medium text-gray-900">Next Appointment</div>
                        <div className="text-sm text-gray-600">{selectedPatient.nextAppointment}</div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">Reschedule</button>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'notes' && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clinical Notes</h3>
                  <div className="text-gray-500">
                    <p>{selectedPatient.notes}</p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      Add New Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <User className="text-gray-300 mb-4 mx-auto" size={64} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a patient</h3>
              <p className="text-gray-500">Choose a patient from the list to view their information</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
              <button
                onClick={() => setShowAddPatient(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) => setNewPatient({...newPatient, dateOfBirth: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
                <input
                  type="text"
                  value={newPatient.insurance}
                  onChange={(e) => setNewPatient({...newPatient, insurance: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
                <input
                  type="text"
                  value={newPatient.emergencyContactName}
                  onChange={(e) => setNewPatient({...newPatient, emergencyContactName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
                <input
                  type="tel"
                  value={newPatient.emergencyContactPhone}
                  onChange={(e) => setNewPatient({...newPatient, emergencyContactPhone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={newPatient.emergencyContactRelationship}
                  onChange={(e) => setNewPatient({...newPatient, emergencyContactRelationship: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddPatient}
                disabled={!newPatient.name || !newPatient.dateOfBirth || !newPatient.phone}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg"
              >
                Add Patient
              </button>
              <button
                onClick={() => setShowAddPatient(false)}
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

export default DoctorPatients;
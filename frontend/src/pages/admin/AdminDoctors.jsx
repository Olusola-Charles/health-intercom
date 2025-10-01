// src/pages/admin/AdminDoctors.jsx
import React, { useState } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit, MoreVertical, Stethoscope, 
  UserPlus, Calendar, Phone, Mail, Star, MapPin
} from 'lucide-react';

const AdminDoctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample doctor data - in real app, this would come from API
  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Smith', 
      specialty: 'Cardiology', 
      patients: 45, 
      rating: 4.9, 
      status: 'Available', 
      email: 'dr.smith@hic.com', 
      phone: '(555) 101-1001',
      experience: '12 years',
      education: 'MD Harvard Medical School',
      department: 'Cardiology',
      schedule: 'Mon-Fri 8AM-5PM'
    },
    { 
      id: 2, 
      name: 'Dr. Michael Williams', 
      specialty: 'Neurology', 
      patients: 38, 
      rating: 4.8, 
      status: 'Busy', 
      email: 'dr.williams@hic.com', 
      phone: '(555) 101-1002',
      experience: '15 years',
      education: 'MD Johns Hopkins',
      department: 'Neurology',
      schedule: 'Mon-Thu 9AM-6PM'
    },
    { 
      id: 3, 
      name: 'Dr. Emily Brown', 
      specialty: 'Pediatrics', 
      patients: 52, 
      rating: 4.9, 
      status: 'Available', 
      email: 'dr.brown@hic.com', 
      phone: '(555) 101-1003',
      experience: '8 years',
      education: 'MD Stanford Medical',
      department: 'Pediatrics',
      schedule: 'Mon-Fri 7AM-4PM'
    },
    { 
      id: 4, 
      name: 'Dr. David Taylor', 
      specialty: 'Orthopedics', 
      patients: 41, 
      rating: 4.7, 
      status: 'Off Duty', 
      email: 'dr.taylor@hic.com', 
      phone: '(555) 101-1004',
      experience: '20 years',
      education: 'MD Mayo Clinic',
      department: 'Orthopedics',
      schedule: 'Mon-Wed 10AM-7PM'
    },
    { 
      id: 5, 
      name: 'Dr. Lisa Miller', 
      specialty: 'Dermatology', 
      patients: 33, 
      rating: 4.8, 
      status: 'Available', 
      email: 'dr.miller@hic.com', 
      phone: '(555) 101-1005',
      experience: '10 years',
      education: 'MD UCLA Medical',
      department: 'Dermatology',
      schedule: 'Tue-Sat 9AM-5PM'
    },
    { 
      id: 6, 
      name: 'Dr. Robert Johnson', 
      specialty: 'Emergency Medicine', 
      patients: 28, 
      rating: 4.6, 
      status: 'Available', 
      email: 'dr.johnson@hic.com', 
      phone: '(555) 101-1006',
      experience: '6 years',
      education: 'MD University of Michigan',
      department: 'Emergency',
      schedule: '24/7 Rotation'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Doctors' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'off-duty', label: 'Off Duty' }
  ];

  const specialties = [...new Set(doctors.map(d => d.specialty))];

  // Filter doctors based on search term and selected filter
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         doctor.status.toLowerCase().replace(' ', '-') === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: doctors.length,
    available: doctors.filter(d => d.status === 'Available').length,
    busy: doctors.filter(d => d.status === 'Busy').length,
    offDuty: doctors.filter(d => d.status === 'Off Duty').length
  };

  const StatCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{doctor.rating}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          doctor.status === 'Available' ? 'bg-green-100 text-green-700' :
          doctor.status === 'Busy' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {doctor.status}
        </span>
      </div>

      <div className="space-y-3 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{doctor.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{doctor.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{doctor.schedule}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500">Patients</p>
          <p className="font-semibold">{doctor.patients}</p>
        </div>
        <div>
          <p className="text-gray-500">Experience</p>
          <p className="font-semibold">{doctor.experience}</p>
        </div>
      </div>

      <div className="flex justify-between space-x-2 pt-4 border-t">
        <button className="flex-1 text-blue-600 hover:bg-blue-50 text-sm py-2 px-3 rounded transition-colors">
          View Profile
        </button>
        <button className="flex-1 text-green-600 hover:bg-green-50 text-sm py-2 px-3 rounded transition-colors">
          Edit
        </button>
        <button className="flex-1 text-purple-600 hover:bg-purple-50 text-sm py-2 px-3 rounded transition-colors">
          Schedule
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Staff Management</h1>
          <p className="text-gray-600 mt-2">Manage doctors, specialties, schedules, and staff assignments</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Doctors" value={stats.total} color="text-blue-600" />
        <StatCard title="Available Now" value={stats.available} color="text-green-600" />
        <StatCard title="Currently Busy" value={stats.busy} color="text-yellow-600" />
        <StatCard title="Off Duty" value={stats.offDuty} color="text-gray-600" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, specialty, or email..."
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
        
        {/* Specialty Pills */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {specialties.map(specialty => (
              <span 
                key={specialty} 
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500">No doctors match your search criteria. Try adjusting your filters.</p>
        </div>
      )}

      {/* Department Summary */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-xl font-bold mb-4">Department Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map(specialty => {
            const specialtyDoctors = doctors.filter(d => d.specialty === specialty);
            const avgRating = (specialtyDoctors.reduce((sum, d) => sum + d.rating, 0) / specialtyDoctors.length).toFixed(1);
            const totalPatients = specialtyDoctors.reduce((sum, d) => sum + d.patients, 0);
            
            return (
              <div key={specialty} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">{specialty}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>{specialtyDoctors.length} doctors</p>
                  <p>{totalPatients} total patients</p>
                  <p>Avg rating: {avgRating} ⭐</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDoctors;
// src/pages/admin/AdminPatients.jsx
import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Download, UserPlus } from 'lucide-react';

const AdminPatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample patient data - in real app, this would come from API
  const patients = [
    { id: 1, name: 'Sarah Johnson', age: 34, lastVisit: '2024-09-01', status: 'Active', doctor: 'Dr. Smith', phone: '(555) 123-4567', email: 'sarah.j@email.com', insurance: 'Blue Cross', emergencyContact: 'John Johnson' },
    { id: 2, name: 'Michael Chen', age: 45, lastVisit: '2024-08-30', status: 'Follow-up', doctor: 'Dr. Williams', phone: '(555) 234-5678', email: 'michael.c@email.com', insurance: 'Aetna', emergencyContact: 'Lisa Chen' },
    { id: 3, name: 'Emma Davis', age: 28, lastVisit: '2024-08-29', status: 'Discharged', doctor: 'Dr. Brown', phone: '(555) 345-6789', email: 'emma.d@email.com', insurance: 'Cigna', emergencyContact: 'Robert Davis' },
    { id: 4, name: 'James Wilson', age: 52, lastVisit: '2024-08-28', status: 'Active', doctor: 'Dr. Taylor', phone: '(555) 456-7890', email: 'james.w@email.com', insurance: 'UnitedHealth', emergencyContact: 'Mary Wilson' },
    { id: 5, name: 'Lisa Anderson', age: 37, lastVisit: '2024-08-27', status: 'Follow-up', doctor: 'Dr. Miller', phone: '(555) 567-8901', email: 'lisa.a@email.com', insurance: 'Blue Cross', emergencyContact: 'David Anderson' },
    { id: 6, name: 'Robert Garcia', age: 41, lastVisit: '2024-08-25', status: 'Active', doctor: 'Dr. Smith', phone: '(555) 678-9012', email: 'robert.g@email.com', insurance: 'Kaiser', emergencyContact: 'Maria Garcia' },
    { id: 7, name: 'Jennifer Lopez', age: 33, lastVisit: '2024-08-24', status: 'Discharged', doctor: 'Dr. Brown', phone: '(555) 789-0123', email: 'jennifer.l@email.com', insurance: 'Humana', emergencyContact: 'Carlos Lopez' },
    { id: 8, name: 'David Martinez', age: 29, lastVisit: '2024-08-23', status: 'Follow-up', doctor: 'Dr. Williams', phone: '(555) 890-1234', email: 'david.m@email.com', insurance: 'Aetna', emergencyContact: 'Ana Martinez' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Patients' },
    { value: 'active', label: 'Active' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'discharged', label: 'Discharged' }
  ];

  // Filter patients based on search term and selected filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         patient.status.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'Active').length,
    followUp: patients.filter(p => p.status === 'Follow-up').length,
    discharged: patients.filter(p => p.status === 'Discharged').length
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-2">Comprehensive patient database and management system</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>Add New Patient</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={stats.total} color="text-blue-600" />
        <StatCard title="Active Patients" value={stats.active} color="text-green-600" />
        <StatCard title="Follow-up Required" value={stats.followUp} color="text-yellow-600" />
        <StatCard title="Recently Discharged" value={stats.discharged} color="text-gray-600" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
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
            
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredPatients.length} of {patients.length} patients
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Insurance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Assigned Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600 text-sm">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{patient.phone}</div>
                      <div className="text-gray-500">{patient.emergencyContact}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{patient.insurance}</td>
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
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Patient Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Patient"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Patient"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No patients found matching your search criteria.</div>
          </div>
        )}
      </div>

      {/* Pagination could go here */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing 1 to {filteredPatients.length} of {filteredPatients.length} results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
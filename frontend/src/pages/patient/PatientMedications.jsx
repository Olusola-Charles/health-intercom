import React, { useState } from 'react';
import { Pill, Clock, AlertTriangle, CheckCircle, Plus, Search, Filter, Bell, Calendar, Download, Eye, RefreshCw } from 'lucide-react';

const PatientMedications = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showRefillRequest, setShowRefillRequest] = useState(false);

  // Mock medications data
  const [medications] = useState([
    {
      id: 1,
      name: 'Lisinopril',
      strength: '10mg',
      form: 'Tablet',
      prescribedBy: 'Dr. Sarah Smith',
      prescribedDate: '2024-01-15',
      lastFilled: '2024-11-15',
      nextRefill: '2024-12-15',
      quantity: 90,
      remaining: 15,
      dosage: 'Take 1 tablet by mouth once daily',
      instructions: 'Take with or without food. Best taken at the same time each day.',
      indication: 'High Blood Pressure',
      refillsRemaining: 3,
      pharmacy: 'MedExpress Pharmacy',
      status: 'active',
      sideEffects: ['Dizziness', 'Dry cough', 'Fatigue'],
      interactions: ['NSAIDs', 'Potassium supplements'],
      cost: '$12.50',
      insurance: 'Covered',
      needsRefill: true,
      adherence: 85
    },
    {
      id: 2,
      name: 'Metformin',
      strength: '500mg',
      form: 'Extended Release Tablet',
      prescribedBy: 'Dr. Sarah Smith',
      prescribedDate: '2024-02-01',
      lastFilled: '2024-11-01',
      nextRefill: '2024-12-01',
      quantity: 60,
      remaining: 45,
      dosage: 'Take 1 tablet by mouth twice daily with meals',
      instructions: 'Take with breakfast and dinner. Do not crush or chew.',
      indication: 'Type 2 Diabetes',
      refillsRemaining: 5,
      pharmacy: 'MedExpress Pharmacy',
      status: 'active',
      sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
      interactions: ['Alcohol', 'Contrast dye'],
      cost: '$8.75',
      insurance: 'Covered',
      needsRefill: false,
      adherence: 92
    },
    {
      id: 3,
      name: 'Ibuprofen',
      strength: '600mg',
      form: 'Tablet',
      prescribedBy: 'Dr. Sarah Smith',
      prescribedDate: '2024-12-15',
      lastFilled: '2024-12-15',
      nextRefill: 'As needed',
      quantity: 30,
      remaining: 28,
      dosage: 'Take 1 tablet by mouth every 8 hours as needed for pain',
      instructions: 'Take with food. Do not exceed 3 tablets in 24 hours.',
      indication: 'Chest pain/Costochondritis',
      refillsRemaining: 2,
      pharmacy: 'MedExpress Pharmacy',
      status: 'active',
      sideEffects: ['Stomach upset', 'Dizziness', 'Heartburn'],
      interactions: ['Blood thinners', 'ACE inhibitors'],
      cost: '$15.25',
      insurance: 'Covered',
      needsRefill: false,
      adherence: 100
    },
    {
      id: 4,
      name: 'Omeprazole',
      strength: '20mg',
      form: 'Delayed Release Capsule',
      prescribedBy: 'Dr. Sarah Smith',
      prescribedDate: '2024-12-15',
      lastFilled: '2024-12-15',
      nextRefill: '2025-01-15',
      quantity: 30,
      remaining: 28,
      dosage: 'Take 1 capsule by mouth once daily',
      instructions: 'Take 30-60 minutes before breakfast. Swallow whole.',
      indication: 'Stomach protection while taking Ibuprofen',
      refillsRemaining: 5,
      pharmacy: 'MedExpress Pharmacy',
      status: 'active',
      sideEffects: ['Headache', 'Nausea', 'Stomach pain'],
      interactions: ['Warfarin', 'Clopidogrel'],
      cost: '$22.00',
      insurance: 'Covered',
      needsRefill: false,
      adherence: 95
    }
  ]);

  const [medicationHistory] = useState([
    {
      id: 5,
      name: 'Hydrochlorothiazide',
      strength: '25mg',
      form: 'Tablet',
      prescribedBy: 'Dr. Michael Johnson',
      prescribedDate: '2023-06-15',
      discontinuedDate: '2024-01-10',
      reason: 'Switched to Lisinopril for better blood pressure control',
      status: 'discontinued'
    },
    {
      id: 6,
      name: 'Atorvastatin',
      strength: '20mg',
      form: 'Tablet',
      prescribedBy: 'Dr. Sarah Smith',
      prescribedDate: '2023-03-20',
      discontinuedDate: '2023-09-15',
      reason: 'Patient developed muscle pain',
      status: 'discontinued'
    }
  ]);

  const [reminders] = useState([
    {
      medication: 'Lisinopril 10mg',
      time: '08:00 AM',
      frequency: 'Daily',
      enabled: true
    },
    {
      medication: 'Metformin 500mg',
      time: '08:00 AM, 06:00 PM',
      frequency: 'Twice daily',
      enabled: true
    }
  ]);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.indication.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' ||
                         (filterBy === 'needs-refill' && med.needsRefill) ||
                         (filterBy === 'low-stock' && med.remaining <= 15);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'discontinued': return 'bg-red-100 text-red-800 border-red-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 90) return 'text-green-600';
    if (adherence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRefillRequest = (medication) => {
    setSelectedMedication(medication);
    setShowRefillRequest(true);
  };

  const renderCurrentMedications = () => (
    <div className="space-y-4">
      {filteredMedications.map((medication) => (
        <div key={medication.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {medication.name} {medication.strength}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(medication.status)}`}>
                  {medication.status}
                </span>
                {medication.needsRefill && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Refill Needed
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{medication.indication}</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Dosage:</strong> {medication.dosage}
              </p>
              <p className="text-sm text-gray-600">{medication.instructions}</p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setSelectedMedication(medication)}
                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                title="View Details"
              >
                <Eye size={20} />
              </button>
              {medication.needsRefill && (
                <button
                  onClick={() => handleRefillRequest(medication)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Request Refill
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Supply Status</label>
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        medication.remaining <= 5 ? 'bg-red-500' :
                        medication.remaining <= 15 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(medication.remaining / medication.quantity) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {medication.remaining}/{medication.quantity}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {medication.remaining} pills remaining
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Adherence</label>
              <div className="mt-1">
                <div className={`text-lg font-semibold ${getAdherenceColor(medication.adherence)}`}>
                  {medication.adherence}%
                </div>
                <p className="text-xs text-gray-600">This month</p>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Last Filled</label>
              <div className="mt-1">
                <div className="text-sm font-medium text-gray-900">{medication.lastFilled}</div>
                <p className="text-xs text-gray-600">{medication.pharmacy}</p>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Next Refill</label>
              <div className="mt-1">
                <div className="text-sm font-medium text-gray-900">{medication.nextRefill}</div>
                <p className="text-xs text-gray-600">{medication.refillsRemaining} refills left</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMedicationHistory = () => (
    <div className="space-y-4">
      {medicationHistory.map((medication) => (
        <div key={medication.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {medication.name} {medication.strength}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(medication.status)}`}>
                  {medication.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                Prescribed by {medication.prescribedBy} on {medication.prescribedDate}
              </p>
              <p className="text-gray-600 mb-2">
                Discontinued on {medication.discontinuedDate}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Reason:</strong> {medication.reason}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Reminders</h3>
        <div className="space-y-4">
          {reminders.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className={reminder.enabled ? 'text-blue-600' : 'text-gray-400'} size={20} />
                <div>
                  <div className="font-medium text-gray-900">{reminder.medication}</div>
                  <div className="text-sm text-gray-600">{reminder.time} • {reminder.frequency}</div>
                </div>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Enabled</span>
              </label>
            </div>
          ))}
        </div>
        
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
          Add New Reminder
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Calendar className="text-blue-600" size={20} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Schedule Pill Organizer</div>
              <div className="text-sm text-gray-600">Set up weekly organization</div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="text-blue-600" size={20} />
            <div className="text-left">
              <div className="font-medium text-gray-900">Download Medication List</div>
              <div className="text-sm text-gray-600">PDF for appointments</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Medications</h1>
          <p className="text-gray-600">Manage your prescriptions and medication schedule</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} />
            Add Medication
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {[
          { id: 'current', label: 'Current Medications', icon: Pill },
          { id: 'history', label: 'Medication History', icon: Clock },
          { id: 'reminders', label: 'Reminders & Tools', icon: Bell }
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

      {/* Search and Filters */}
      {activeTab === 'current' && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Medications</option>
            <option value="needs-refill">Needs Refill</option>
            <option value="low-stock">Low Stock</option>
          </select>
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'current' && renderCurrentMedications()}
      {activeTab === 'history' && renderMedicationHistory()}
      {activeTab === 'reminders' && renderReminders()}

      {/* Medication Details Modal */}
      {selectedMedication && !showRefillRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedMedication.name} {selectedMedication.strength}
              </h3>
              <button
                onClick={() => setSelectedMedication(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Prescribed By</label>
                  <p className="text-gray-900">{selectedMedication.prescribedBy}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Prescribed Date</label>
                  <p className="text-gray-900">{selectedMedication.prescribedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Form</label>
                  <p className="text-gray-900">{selectedMedication.form}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cost</label>
                  <p className="text-gray-900">{selectedMedication.cost} ({selectedMedication.insurance})</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Instructions</label>
                <p className="text-gray-900">{selectedMedication.instructions}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Common Side Effects</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedMedication.sideEffects.map((effect, index) => (
                    <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Drug Interactions</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedMedication.interactions.map((interaction, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {interaction}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Set Reminder
              </button>
              <button
                onClick={() => setSelectedMedication(null)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refill Request Modal */}
      {showRefillRequest && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Request Refill</h3>
              <button
                onClick={() => {setShowRefillRequest(false); setSelectedMedication(null);}}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {selectedMedication.name} {selectedMedication.strength}
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Prescribed by: {selectedMedication.prescribedBy}</p>
                  <p>Pharmacy: {selectedMedication.pharmacy}</p>
                  <p>Refills remaining: {selectedMedication.refillsRemaining}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pickup Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Option</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="pickup">Pharmacy Pickup</option>
                  <option value="delivery">Home Delivery</option>
                  <option value="mail">Mail Order</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Any special instructions for the pharmacy..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Submit Request
              </button>
              <button
                onClick={() => {setShowRefillRequest(false); setSelectedMedication(null);}}
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

export default PatientMedications;
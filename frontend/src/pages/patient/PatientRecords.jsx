import React, { useState } from 'react';
import { FileText, Download, Eye, Search, Calendar, User, Activity, TestTube, Pill, Heart, Filter, Upload, Share2, Lock } from 'lucide-react';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('visits');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock medical records data
  const [visitRecords] = useState([
    {
      id: 1,
      date: '2024-12-15',
      provider: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      type: 'Follow-up Visit',
      location: 'Heart Health Center',
      duration: '30 minutes',
      chiefComplaint: 'Hypertension follow-up',
      diagnosis: ['I10 - Essential hypertension'],
      vitals: {
        bloodPressure: '128/82',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '185 lbs',
        height: '5\'10"',
        bmi: '26.8'
      },
      summary: 'Patient continues to do well on current antihypertensive regimen. Blood pressure well controlled. Continue current medications and lifestyle modifications.',
      medications: ['Lisinopril 10mg daily', 'Hydrochlorothiazide 25mg daily'],
      followUp: 'Return in 3 months',
      documents: ['Visit Summary.pdf', 'Prescription.pdf']
    },
    {
      id: 2,
      date: '2024-11-15',
      provider: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      type: 'Lab Results Review',
      location: 'Heart Health Center',
      duration: '15 minutes',
      chiefComplaint: 'Review of recent laboratory studies',
      diagnosis: ['I10 - Essential hypertension', 'E11.9 - Type 2 diabetes mellitus'],
      vitals: {
        bloodPressure: '130/85',
        heartRate: '74 bpm',
        weight: '186 lbs'
      },
      summary: 'Laboratory results reviewed. HbA1c improved to 6.8%. Lipid panel within normal limits. Continue current diabetes management.',
      medications: ['Metformin 500mg twice daily'],
      followUp: 'Continue monitoring',
      documents: ['Lab Results.pdf']
    },
    {
      id: 3,
      date: '2024-10-20',
      provider: 'Dr. Michael Johnson',
      specialty: 'Internal Medicine',
      type: 'Annual Physical Exam',
      location: 'Primary Care Clinic',
      duration: '45 minutes',
      chiefComplaint: 'Annual wellness examination',
      diagnosis: ['Z00.00 - Encounter for general adult medical examination'],
      vitals: {
        bloodPressure: '132/84',
        heartRate: '70 bpm',
        temperature: '98.4°F',
        weight: '184 lbs',
        height: '5\'10"',
        bmi: '26.4'
      },
      summary: 'Comprehensive annual examination completed. Overall health good. Discussed preventive care measures and health maintenance.',
      medications: ['Continue current medications'],
      followUp: 'Annual physical next year',
      documents: ['Physical Exam Summary.pdf', 'Preventive Care Plan.pdf']
    }
  ]);

  const [labResults] = useState([
    {
      id: 1,
      date: '2024-11-15',
      orderedBy: 'Dr. Sarah Smith',
      testName: 'Comprehensive Metabolic Panel',
      status: 'Complete',
      results: [
        { test: 'Glucose', value: '142', range: '70-100', unit: 'mg/dL', flag: 'High' },
        { test: 'BUN', value: '18', range: '7-20', unit: 'mg/dL', flag: 'Normal' },
        { test: 'Creatinine', value: '1.0', range: '0.6-1.2', unit: 'mg/dL', flag: 'Normal' },
        { test: 'Sodium', value: '140', range: '136-145', unit: 'mEq/L', flag: 'Normal' },
        { test: 'Potassium', value: '4.2', range: '3.5-5.0', unit: 'mEq/L', flag: 'Normal' }
      ],
      notes: 'Glucose slightly elevated. Continue diabetes monitoring.',
      documents: ['CMP Results.pdf']
    },
    {
      id: 2,
      date: '2024-11-15',
      orderedBy: 'Dr. Sarah Smith',
      testName: 'HbA1c',
      status: 'Complete',
      results: [
        { test: 'Hemoglobin A1c', value: '6.8', range: '<7.0', unit: '%', flag: 'Normal' }
      ],
      notes: 'Improved diabetes control. Continue current regimen.',
      documents: ['HbA1c Report.pdf']
    },
    {
      id: 3,
      date: '2024-10-20',
      orderedBy: 'Dr. Michael Johnson',
      testName: 'Lipid Panel',
      status: 'Complete',
      results: [
        { test: 'Total Cholesterol', value: '195', range: '<200', unit: 'mg/dL', flag: 'Normal' },
        { test: 'LDL Cholesterol', value: '118', range: '<100', unit: 'mg/dL', flag: 'High' },
        { test: 'HDL Cholesterol', value: '42', range: '>40', unit: 'mg/dL', flag: 'Normal' },
        { test: 'Triglycerides', value: '175', range: '<150', unit: 'mg/dL', flag: 'High' }
      ],
      notes: 'LDL and triglycerides elevated. Dietary counseling provided.',
      documents: ['Lipid Panel.pdf']
    }
  ]);

  const [imagingResults] = useState([
    {
      id: 1,
      date: '2024-09-15',
      orderedBy: 'Dr. Sarah Smith',
      studyType: 'Echocardiogram',
      location: 'Cardiac Imaging Center',
      indication: 'Evaluate cardiac function',
      findings: 'Normal left ventricular function. Ejection fraction 60%. No significant valvular abnormalities.',
      impression: 'Normal echocardiogram',
      status: 'Final',
      images: 4,
      documents: ['Echo Report.pdf', 'Echo Images.dcm']
    },
    {
      id: 2,
      date: '2024-08-10',
      orderedBy: 'Dr. Michael Johnson',
      studyType: 'Chest X-Ray',
      location: 'Radiology Department',
      indication: 'Annual screening',
      findings: 'Lungs are clear. Heart size normal. No acute cardiopulmonary process.',
      impression: 'Normal chest radiograph',
      status: 'Final',
      images: 2,
      documents: ['Chest XR Report.pdf']
    }
  ]);

  const [vaccinationRecords] = useState([
    {
      id: 1,
      vaccine: 'Influenza',
      date: '2024-10-15',
      provider: 'Dr. Michael Johnson',
      lot: 'FL2024-001',
      site: 'Left deltoid',
      nextDue: '2025-10-15'
    },
    {
      id: 2,
      vaccine: 'COVID-19 Booster',
      date: '2024-09-20',
      provider: 'Pharmacy Clinic',
      lot: 'CV2024-087',
      site: 'Right deltoid',
      nextDue: 'TBD'
    },
    {
      id: 3,
      vaccine: 'Tdap',
      date: '2022-03-15',
      provider: 'Dr. Michael Johnson',
      lot: 'TD2022-045',
      site: 'Left deltoid',
      nextDue: '2032-03-15'
    }
  ]);

  const filteredRecords = (records) => {
    return records.filter(record => {
      const matchesSearch = searchTerm === '' || 
        Object.values(record).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      if (filterDate === 'all') return matchesSearch;
      
      const recordDate = new Date(record.date);
      const now = new Date();
      
      switch (filterDate) {
        case '30days':
          return matchesSearch && (now - recordDate) <= 30 * 24 * 60 * 60 * 1000;
        case '6months':
          return matchesSearch && (now - recordDate) <= 180 * 24 * 60 * 60 * 1000;
        case '1year':
          return matchesSearch && (now - recordDate) <= 365 * 24 * 60 * 60 * 1000;
        default:
          return matchesSearch;
      }
    });
  };

  const getResultFlag = (flag) => {
    switch (flag) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Low': return 'text-blue-600 bg-blue-50';
      case 'Critical': return 'text-red-800 bg-red-100 font-bold';
      case 'Normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderVisitRecords = () => (
    <div className="space-y-4">
      {filteredRecords(visitRecords).map((visit) => (
        <div key={visit.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{visit.type}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {visit.specialty}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <p><strong>Date:</strong> {visit.date}</p>
                <p><strong>Provider:</strong> {visit.provider}</p>
                <p><strong>Location:</strong> {visit.location}</p>
                <p><strong>Duration:</strong> {visit.duration}</p>
              </div>
              <p className="text-gray-700 mb-3">{visit.summary}</p>
            </div>
            <button
              onClick={() => setSelectedRecord(visit)}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
            >
              <Eye size={20} />
            </button>
          </div>

          {visit.vitals && (
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Vital Signs</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(visit.vitals).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {visit.documents.map((doc, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Download size={14} />
                  {doc}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">Follow-up: {visit.followUp}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLabResults = () => (
    <div className="space-y-4">
      {filteredRecords(labResults).map((lab) => (
        <div key={lab.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{lab.testName}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>Ordered by {lab.orderedBy} on {lab.date}</p>
                <p className="mt-1">Status: <span className="text-green-600 font-medium">{lab.status}</span></p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRecord(lab)}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
            >
              <Eye size={20} />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Results</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Test</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Value</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Range</th>
                    <th className="text-left py-2 text-sm font-medium text-gray-600">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {lab.results.map((result, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-sm text-gray-900">{result.test}</td>
                      <td className="py-2 text-sm text-gray-900">{result.value} {result.unit}</td>
                      <td className="py-2 text-sm text-gray-600">{result.range} {result.unit}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultFlag(result.flag)}`}>
                          {result.flag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {lab.notes && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-gray-700"><strong>Notes:</strong> {lab.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderImagingResults = () => (
    <div className="space-y-4">
      {filteredRecords(imagingResults).map((imaging) => (
        <div key={imaging.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{imaging.studyType}</h3>
              <div className="text-sm text-gray-600 mt-1">
                <p>Ordered by {imaging.orderedBy} on {imaging.date}</p>
                <p>Location: {imaging.location}</p>
                <p>Status: <span className="text-green-600 font-medium">{imaging.status}</span></p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRecord(imaging)}
              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
            >
              <Eye size={20} />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Indication</h4>
                <p className="text-sm text-gray-700">{imaging.indication}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Images</h4>
                <p className="text-sm text-gray-700">{imaging.images} images acquired</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Findings</h4>
              <p className="text-sm text-gray-700 mb-3">{imaging.findings}</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Impression</h4>
              <p className="text-sm text-gray-700">{imaging.impression}</p>
            </div>

            <div className="mt-4 flex gap-2">
              {imaging.documents.map((doc, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Download size={14} />
                  {doc}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderVaccinations = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-600">Vaccine</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Date Given</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Provider</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Next Due</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationRecords.map((vaccine) => {
                const nextDue = new Date(vaccine.nextDue);
                const isOverdue = nextDue < new Date() && vaccine.nextDue !== 'TBD';
                
                return (
                  <tr key={vaccine.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-900">{vaccine.vaccine}</td>
                    <td className="py-3 text-sm text-gray-900">{vaccine.date}</td>
                    <td className="py-3 text-sm text-gray-600">{vaccine.provider}</td>
                    <td className="py-3 text-sm text-gray-900">{vaccine.nextDue}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isOverdue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {isOverdue ? 'Overdue' : 'Current'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Medical Records</h1>
          <p className="text-gray-600">Access your complete health information</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <Upload size={20} />
            Upload Document
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Share2 size={20} />
            Share Records
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {[
          { id: 'visits', label: 'Visit Records', icon: FileText },
          { id: 'labs', label: 'Lab Results', icon: TestTube },
          { id: 'imaging', label: 'Imaging', icon: Activity },
          { id: 'vaccinations', label: 'Vaccinations', icon: Heart }
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
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Time</option>
          <option value="30days">Last 30 Days</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Tab Content */}
      {activeTab === 'visits' && renderVisitRecords()}
      {activeTab === 'labs' && renderLabResults()}
      {activeTab === 'imaging' && renderImagingResults()}
      {activeTab === 'vaccinations' && renderVaccinations()}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedRecord.type || selectedRecord.testName || selectedRecord.studyType || 'Medical Record Details'}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="text-gray-900">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Provider</label>
                  <p className="text-gray-900">{selectedRecord.provider || selectedRecord.orderedBy}</p>
                </div>
                {selectedRecord.location && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <p className="text-gray-900">{selectedRecord.location}</p>
                  </div>
                )}
                {selectedRecord.status && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <p className="text-gray-900">{selectedRecord.status}</p>
                  </div>
                )}
              </div>

              {/* Visit-specific content */}
              {selectedRecord.chiefComplaint && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Chief Complaint</label>
                  <p className="text-gray-900">{selectedRecord.chiefComplaint}</p>
                </div>
              )}

              {selectedRecord.summary && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Summary</label>
                  <p className="text-gray-900">{selectedRecord.summary}</p>
                </div>
              )}

              {/* Lab results */}
              {selectedRecord.results && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Results</label>
                  <div className="mt-2 overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Test</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Value</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Range</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Flag</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRecord.results.map((result, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="py-2 px-3 text-sm text-gray-900">{result.test}</td>
                            <td className="py-2 px-3 text-sm text-gray-900">{result.value} {result.unit}</td>
                            <td className="py-2 px-3 text-sm text-gray-600">{result.range} {result.unit}</td>
                            <td className="py-2 px-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultFlag(result.flag)}`}>
                                {result.flag}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Imaging findings */}
              {selectedRecord.findings && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Findings</label>
                  <p className="text-gray-900">{selectedRecord.findings}</p>
                </div>
              )}

              {selectedRecord.impression && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Impression</label>
                  <p className="text-gray-900">{selectedRecord.impression}</p>
                </div>
              )}

              {/* Vital signs */}
              {selectedRecord.vitals && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Vital Signs</label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedRecord.vitals).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div className="text-lg font-semibold text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {selectedRecord.documents && selectedRecord.documents.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Available Documents</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedRecord.documents.map((doc, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        <Download size={16} />
                        {doc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedRecord.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-700">Clinical Notes</label>
                  <p className="text-gray-700 mt-1">{selectedRecord.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Download PDF
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg">
                Share Record
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRecords
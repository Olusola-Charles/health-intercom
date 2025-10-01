import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Save, X, Calendar, User, FileText, Clock, Tag, Download, Share2, AlertCircle, CheckCircle, Star, Camera, Mic, Paperclip, Eye, Copy, Trash2, Archive, RefreshCw, Users, Activity } from 'lucide-react';

const ClinicalNotes = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNewNote, setShowNewNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showVitalSigns, setShowVitalSigns] = useState(false);
  const [showDiagnosisCodes, setShowDiagnosisCodes] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [showAttachments, setShowAttachments] = useState(false);

  // Note templates for different specialties
  const noteTemplates = {
    'Progress Note': {
      subjective: 'Patient reports [symptoms/concerns]. Review of systems: [positive/negative findings].',
      objective: 'Vital signs: BP: ___, HR: ___, Temp: ___, RR: ___, O2 Sat: ___%. Physical examination: [findings].',
      assessment: '[Primary diagnosis]. [Secondary diagnoses if applicable].',
      plan: '[Treatment plan]. [Follow-up instructions]. [Patient education provided].'
    },
    'Consultation': {
      subjective: 'Referred for [reason]. Patient reports [chief complaint]. History of present illness: [detailed history].',
      objective: 'General appearance: [description]. Focused examination: [relevant findings].',
      assessment: '[Impression/diagnosis]. Differential diagnoses: [alternatives considered].',
      plan: '[Recommendations]. [Additional testing if indicated]. [Follow-up arrangements].'
    },
    'Annual Physical': {
      subjective: 'Patient here for routine annual examination. No acute complaints. Review of systems negative except as noted.',
      objective: 'Vital signs stable. BMI: ___. Complete physical examination: [findings by system].',
      assessment: 'Generally healthy [age]-year-old [gender]. [Any identified health maintenance needs].',
      plan: '[Screening recommendations]. [Immunizations]. [Lifestyle counseling]. Next visit in 1 year.'
    },
    'Emergency Visit': {
      subjective: 'Patient presents via [EMS/walk-in] with [chief complaint]. Onset: [timing]. Associated symptoms: [list].',
      objective: 'Triage vital signs: [values]. Physical examination reveals: [pertinent findings].',
      assessment: '[Working diagnosis]. [Severity assessment]. [Disposition considerations].',
      plan: '[Immediate interventions]. [Diagnostic workup]. [Disposition]. [Discharge planning if applicable].'
    }
  };

  // Common diagnosis codes (ICD-10)
  const commonDiagnoses = [
    { code: 'I10', description: 'Essential hypertension' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'Z00.00', description: 'Encounter for general adult medical examination without abnormal findings' },
    { code: 'M79.3', description: 'Panniculitis, unspecified' },
    { code: 'K21.9', description: 'Gastro-esophageal reflux disease without esophagitis' },
    { code: 'F41.9', description: 'Anxiety disorder, unspecified' },
    { code: 'M25.50', description: 'Pain in unspecified joint' },
    { code: 'R06.02', description: 'Shortness of breath' },
    { code: 'J06.9', description: 'Acute upper respiratory infection, unspecified' },
    { code: 'M94.0', description: 'Costochondritis' }
  ];

  const noteTypes = [
    'Progress Note',
    'Consultation',
    'Annual Physical',
    'Follow-up',
    'Emergency Visit',
    'Procedure Note',
    'Discharge Summary',
    'Telephone Encounter'
  ];

  const priorities = [
    { value: 'urgent', label: 'Urgent', color: 'text-red-600 bg-red-50 border-red-200' },
    { value: 'high', label: 'High', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { value: 'normal', label: 'Normal', color: 'text-green-600 bg-green-50 border-green-200' },
    { value: 'low', label: 'Low', color: 'text-blue-600 bg-blue-50 border-blue-200' }
  ];

  // Mock clinical notes data with comprehensive details
  const [notes, setNotes] = useState([
    {
      id: 1,
      patientId: 'P001',
      patientName: 'John Doe',
      patientAge: 58,
      patientGender: 'Male',
      date: '2024-12-15',
      time: '10:30 AM',
      type: 'Progress Note',
      status: 'completed',
      priority: 'normal',
      chiefComplaint: 'Follow-up for hypertension management',
      subjective: 'Patient reports feeling well overall. No chest pain, shortness of breath, or dizziness. Taking medications as prescribed without side effects. Blood pressure readings at home averaging 125/80. Adhering to low-sodium diet and regular walking routine.',
      objective: 'Vital Signs: BP: 128/82, HR: 72 bpm, Temp: 98.6°F, RR: 16, O2 Sat: 98% RA, Weight: 185 lbs, BMI: 26.8. Physical Examination: Well-appearing male in no acute distress. Heart rate regular, no murmurs, rubs, or gallops. Lungs clear to auscultation bilaterally. No peripheral edema noted.',
      assessment: 'Essential hypertension, well controlled on current antihypertensive regimen. Patient demonstrates excellent medication compliance and lifestyle adherence.',
      plan: 'Continue current medications (Lisinopril 10mg daily, HCTZ 25mg daily). Maintain current diet and exercise routine. Home BP monitoring continues. Follow-up in 3 months or sooner if BP consistently >140/90.',
      medications: ['Lisinopril 10mg daily', 'Hydrochlorothiazide 25mg daily', 'Aspirin 81mg daily'],
      labOrders: ['Basic metabolic panel in 3 months', 'Annual lipid panel due'],
      vitalSigns: {
        bloodPressure: { systolic: '128', diastolic: '82' },
        heartRate: '72',
        temperature: '98.6',
        respiratoryRate: '16',
        oxygenSaturation: '98',
        weight: '185',
        height: '5\'10"',
        bmi: '26.8',
        painScale: '0/10'
      },
      diagnosisCodes: [
        { code: 'I10', description: 'Essential hypertension' }
      ],
      attachments: [],
      followUp: '3 months',
      signed: true,
      starred: false,
      lastModified: '2024-12-15 10:45:00',
      version: 1
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Emily Davis',
      patientAge: 32,
      patientGender: 'Female',
      date: '2024-12-15',
      time: '2:15 PM',
      type: 'Consultation',
      status: 'draft',
      priority: 'urgent',
      chiefComplaint: 'New onset chest pain',
      subjective: 'Patient presents with 2-day history of intermittent chest pain, described as sharp, stabbing, localized to left chest wall. Pain worsens with deep inspiration and movement. No radiation. No associated shortness of breath, nausea, vomiting, or diaphoresis. No recent trauma or heavy lifting. Denies fever or cough. No family history of cardiac disease. Non-smoker, minimal alcohol use.',
      objective: 'Vital Signs: BP: 140/88, HR: 88 bpm, Temp: 99.2°F, RR: 18, O2 Sat: 98% RA. General: Anxious-appearing female in mild distress. HEENT: Normal. Cardiovascular: RRR, no murmurs. Respiratory: CTAB, reproducible chest wall tenderness over left 4th-6th costochondral junctions. Abdomen: Soft, non-tender. Extremities: No edema.',
      assessment: 'Most likely costochondritis versus musculoskeletal chest pain. Low probability of cardiac etiology given patient age, atypical presentation, normal cardiac examination, and absence of risk factors.',
      plan: 'NSAIDs for anti-inflammatory effect and pain control. Chest X-ray to rule out pulmonary pathology. Consider cardiac enzymes if clinical suspicion changes. Patient education on warning signs requiring immediate medical evaluation. Activity modification with gradual return to normal activities as tolerated.',
      medications: ['Ibuprofen 600mg TID with food', 'Omeprazole 20mg daily for GI protection'],
      labOrders: ['Chest X-ray PA/Lateral', 'Basic metabolic panel if symptoms persist'],
      vitalSigns: {
        bloodPressure: { systolic: '140', diastolic: '88' },
        heartRate: '88',
        temperature: '99.2',
        respiratoryRate: '18',
        oxygenSaturation: '98',
        weight: '125',
        height: '5\'4"',
        bmi: '21.5',
        painScale: '6/10'
      },
      diagnosisCodes: [
        { code: 'M94.0', description: 'Costochondritis' },
        { code: 'R07.89', description: 'Other chest pain' }
      ],
      attachments: [
        { name: 'EKG_12_15_2024.pdf', type: 'pdf', size: '2.3 MB' },
        { name: 'chest_xray.jpg', type: 'image', size: '1.8 MB' }
      ],
      followUp: '1 week or PRN if worsening',
      signed: false,
      starred: true,
      lastModified: '2024-12-15 14:30:00',
      version: 2
    },
    {
      id: 3,
      patientId: 'P003',
      patientName: 'Michael Chen',
      patientAge: 45,
      patientGender: 'Male',
      date: '2024-12-14',
      time: '9:00 AM',
      type: 'Annual Physical',
      status: 'completed',
      priority: 'normal',
      chiefComplaint: 'Annual wellness visit',
      subjective: 'Patient here for routine annual physical examination. No acute complaints. Feels well overall. Regular exercise routine (running 3x/week). Non-smoker, occasional social alcohol use. No new medications or supplements.',
      objective: 'Vital Signs: BP: 118/76, HR: 65 bpm, Temp: 98.4°F, RR: 14, BMI: 24.2. Well-developed, well-nourished male in no distress. Complete physical examination normal including cardiovascular, respiratory, abdominal, and neurological systems.',
      assessment: 'Healthy 45-year-old male. All age-appropriate screening tests current.',
      plan: 'Continue current healthy lifestyle habits. Colonoscopy screening recommended at age 50. Annual laboratory studies ordered. Return for any concerns.',
      medications: ['Multivitamin daily'],
      labOrders: ['Complete metabolic panel', 'Lipid panel', 'HbA1c', 'PSA'],
      vitalSigns: {
        bloodPressure: { systolic: '118', diastolic: '76' },
        heartRate: '65',
        temperature: '98.4',
        respiratoryRate: '14',
        oxygenSaturation: '99',
        weight: '175',
        height: '5\'9"',
        bmi: '24.2',
        painScale: '0/10'
      },
      diagnosisCodes: [
        { code: 'Z00.00', description: 'Encounter for general adult medical examination without abnormal findings' }
      ],
      attachments: [],
      followUp: '1 year',
      signed: true,
      starred: false,
      lastModified: '2024-12-14 09:30:00',
      version: 1
    }
  ]);

  const [newNote, setNewNote] = useState({
    patientName: '',
    type: '',
    chiefComplaint: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    medications: [],
    labOrders: [],
    followUp: '',
    priority: 'normal',
    vitalSigns: {
      bloodPressure: { systolic: '', diastolic: '' },
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: '',
      bmi: '',
      painScale: ''
    },
    diagnosisCodes: []
  });

  // Auto-save functionality
  useEffect(() => {
    if (isEditing && selectedNote) {
      setAutoSaveStatus('saving');
      const timer = setTimeout(() => {
        setAutoSaveStatus('saved');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedNote, isEditing]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterBy === 'all' ||
      (filterBy === 'recent' && new Date(note.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filterBy === 'urgent' && note.priority === 'urgent') ||
      (filterBy === 'draft' && note.status === 'draft');
    
    return matchesSearch && matchesFilter;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time);
      case 'patient':
        return a.patientName.localeCompare(b.patientName);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const getPriorityStyle = (priority) => {
    return priorities.find(p => p.value === priority)?.color || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const handleSaveNote = () => {
    if (selectedNote && isEditing) {
      const updatedNotes = notes.map(note => 
        note.id === selectedNote.id ? { 
          ...selectedNote, 
          status: 'completed',
          lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
          version: (selectedNote.version || 1) + 1
        } : note
      );
      setNotes(updatedNotes);
      setIsEditing(false);
      setAutoSaveStatus('saved');
    }
  };

  const handleTemplateApply = (templateType) => {
    if (selectedNote && isEditing) {
      const template = noteTemplates[templateType];
      setSelectedNote({
        ...selectedNote,
        subjective: template.subjective,
        objective: template.objective,
        assessment: template.assessment,
        plan: template.plan
      });
    }
    setShowTemplates(false);
  };

  const handleAddDiagnosis = (diagnosis) => {
    if (selectedNote && isEditing) {
      const newDiagnoses = [...(selectedNote.diagnosisCodes || []), diagnosis];
      setSelectedNote({
        ...selectedNote,
        diagnosisCodes: newDiagnoses
      });
    }
    setShowDiagnosisCodes(false);
  };

  const handleCreateNote = () => {
    const note = {
      id: notes.length + 1,
      patientId: 'P' + String(notes.length + 1).padStart(3, '0'),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'draft',
      signed: false,
      starred: false,
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
      version: 1,
      attachments: [],
      ...newNote
    };
    setNotes([note, ...notes]);
    setSelectedNote(note);
    setShowNewNote(false);
    setIsEditing(true);
    setNewNote({
      patientName: '',
      type: '',
      chiefComplaint: '',
      subjective: '',
      objective: '',
      assessment: '',
      plan: '',
      medications: [],
      labOrders: [],
      followUp: '',
      priority: 'normal',
      vitalSigns: {
        bloodPressure: { systolic: '', diastolic: '' },
        heartRate: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        weight: '',
        height: '',
        bmi: '',
        painScale: ''
      },
      diagnosisCodes: []
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Notes List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Clinical Notes</h2>
            <button
              onClick={() => setShowNewNote(true)}
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
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-3">
            {['all', 'recent', 'urgent', 'draft'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterBy(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filterBy === filter
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="date">Sort by Date</option>
            <option value="patient">Sort by Patient</option>
            <option value="type">Sort by Type</option>
          </select>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => {setSelectedNote(note); setIsEditing(false);}}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                selectedNote?.id === note.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{note.patientName}</h3>
                  {note.starred && <Star size={14} className="text-yellow-400 fill-current" />}
                  {note.attachments && note.attachments.length > 0 && <Paperclip size={14} className="text-gray-400" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityStyle(note.priority)}`}>
                    {note.priority}
                  </span>
                  {note.status === 'draft' && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{note.type}</p>
              <p className="text-sm text-gray-700 mb-2 line-clamp-2">{note.chiefComplaint}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{note.date} • {note.time}</span>
                <div className="flex items-center gap-1">
                  {note.signed ? (
                    <CheckCircle size={12} className="text-green-500" />
                  ) : (
                    <AlertCircle size={12} className="text-yellow-500" />
                  )}
                  <span>{note.signed ? 'Signed' : 'Unsigned'}</span>
                </div>
              </div>
              {note.version > 1 && (
                <div className="text-xs text-blue-600 mt-1">v{note.version}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            {/* Note Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedNote.patientName}</h2>
                    <span className="text-sm text-gray-500">
                      {selectedNote.patientAge}y {selectedNote.patientGender}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium border ${getPriorityStyle(selectedNote.priority)}`}>
                      {selectedNote.priority}
                    </span>
                    {selectedNote.status === 'draft' && (
                      <span className="px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        Draft
                      </span>
                    )}
                    {autoSaveStatus === 'saving' && (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <RefreshCw size={12} className="animate-spin" />
                        Saving...
                      </div>
                    )}
                    {autoSaveStatus === 'saved' && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle size={12} />
                        Saved
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600">{selectedNote.type} • {selectedNote.date} • {selectedNote.time}</p>
                  <p className="text-xs text-gray-500">Last modified: {selectedNote.lastModified}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedNote({...selectedNote, starred: !selectedNote.starred})}
                        className={`p-2 rounded-lg hover:bg-gray-100 ${selectedNote.starred ? 'text-yellow-400' : 'text-gray-600'}`}
                      >
                        <Star size={20} className={selectedNote.starred ? 'fill-current' : ''} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                        <Download size={20} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                        <Share2 size={20} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100">
                        <Copy size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowTemplates(true)}
                        className="text-purple-600 hover:text-purple-800 p-2 rounded-lg hover:bg-purple-50"
                        title="Apply Template"
                      >
                        <FileText size={20} />
                      </button>
                      <button
                        onClick={() => setShowVitalSigns(true)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                        title="Add Vital Signs"
                      >
                        <Activity size={20} />
                      </button>
                      <button
                        onClick={() => setShowDiagnosisCodes(true)}
                        className="text-orange-600 hover:text-orange-800 p-2 rounded-lg hover:bg-orange-50"
                        title="Add Diagnosis Codes"
                      >
                        <Tag size={20} />
                      </button>
                      <button
                        onClick={() => setShowAttachments(true)}
                        className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
                        title="Add Attachments"
                      >
                        <Paperclip size={20} />
                      </button>
                      <button
                        onClick={handleSaveNote}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <X size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Patient Info & Vital Signs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>ID: {selectedNote.patientId}</div>
                      <div>Age: {selectedNote.patientAge}</div>
                      <div>Gender: {selectedNote.patientGender}</div>
                      <div>Date: {selectedNote.date}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Vital Signs</h3>
                    {selectedNote.vitalSigns && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>BP: {selectedNote.vitalSigns.bloodPressure.systolic}/{selectedNote.vitalSigns.bloodPressure.diastolic}</div>
                        <div>HR: {selectedNote.vitalSigns.heartRate} bpm</div>
                        <div>Temp: {selectedNote.vitalSigns.temperature}°F</div>
                        <div>RR: {selectedNote.vitalSigns.respiratoryRate}</div>
                        <div>O2 Sat: {selectedNote.vitalSigns.oxygenSaturation}%</div>
                        <div>BMI: {selectedNote.vitalSigns.bmi}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Chief Complaint */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Chief Complaint</label>
                  {isEditing ? (
                    <textarea
                      value={selectedNote.chiefComplaint}
                      onChange={(e) => setSelectedNote({...selectedNote, chiefComplaint: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                      rows="2"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedNote.chiefComplaint}</p>
                  )}
                </div>

                {/* SOAP Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Subjective */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subjective</label>
                    {isEditing ? (
                      <textarea
                        value={selectedNote.subjective}
                        onChange={(e) => setSelectedNote({...selectedNote, subjective: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        rows="8"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedNote.subjective}</p>
                    )}
                  </div>

                  {/* Objective */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Objective</label>
                    {isEditing ? (
                      <textarea
                        value={selectedNote.objective}
                        onChange={(e) => setSelectedNote({...selectedNote, objective: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        rows="8"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedNote.objective}</p>
                    )}
                  </div>

                  {/* Assessment */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assessment</label>
                    {isEditing ? (
                      <textarea
                        value={selectedNote.assessment}
                        onChange={(e) => setSelectedNote({...selectedNote, assessment: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        rows="8"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedNote.assessment}</p>
                    )}
                  </div>

                  {/* Plan */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Plan</label>
                    {isEditing ? (
                      <textarea
                        value={selectedNote.plan}
                        onChange={(e) => setSelectedNote({...selectedNote, plan: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        rows="8"
                      />
                    ) : (
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedNote.plan}</p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Medications */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Medications</label>
                    {selectedNote.medications && selectedNote.medications.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedNote.medications.map((med, index) => (
                          <li key={index} className="text-gray-900 text-sm">• {med}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No medications prescribed</p>
                    )}
                  </div>

                  {/* Lab Orders */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lab Orders</label>
                    {selectedNote.labOrders && selectedNote.labOrders.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedNote.labOrders.map((lab, index) => (
                          <li key={index} className="text-gray-900 text-sm">• {lab}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No lab orders</p>
                    )}
                  </div>

                  {/* Follow-up */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Follow-up</label>
                    <p className="text-gray-900">{selectedNote.followUp}</p>
                  </div>
                </div>

                {/* Diagnosis Codes */}
                {selectedNote.diagnosisCodes && selectedNote.diagnosisCodes.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis Codes (ICD-10)</label>
                    <div className="space-y-1">
                      {selectedNote.diagnosisCodes.map((diagnosis, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">{diagnosis.code}</span>
                          <span className="text-gray-900">{diagnosis.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {selectedNote.attachments && selectedNote.attachments.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Attachments</label>
                    <div className="space-y-2">
                      {selectedNote.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                          <Paperclip size={16} className="text-gray-400" />
                          <span className="flex-1">{attachment.name}</span>
                          <span className="text-gray-500">{attachment.size}</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye size={16} />
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Signature */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {selectedNote.signed ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <AlertCircle className="text-yellow-500" size={20} />
                      )}
                      <span className="font-medium text-gray-700">
                        {selectedNote.signed ? 'Electronically Signed' : 'Awaiting Signature'}
                      </span>
                      {selectedNote.signed && (
                        <span className="text-sm text-gray-500">
                          • Dr. Sarah Smith • {selectedNote.date} {selectedNote.time}
                        </span>
                      )}
                    </div>
                    {!selectedNote.signed && (
                      <button 
                        onClick={() => setSelectedNote({...selectedNote, signed: true})}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Sign Note
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No Note Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="text-gray-300 mb-4 mx-auto" size={64} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a clinical note</h3>
              <p className="text-gray-500">Choose a note from the sidebar to view or edit</p>
            </div>
          </div>
        )}
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Apply Note Template</h3>
              <button onClick={() => setShowTemplates(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-2">
              {Object.keys(noteTemplates).map((templateType) => (
                <button
                  key={templateType}
                  onClick={() => handleTemplateApply(templateType)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">{templateType}</div>
                  <div className="text-sm text-gray-500">Apply {templateType.toLowerCase()} template</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Diagnosis Codes Modal */}
      {showDiagnosisCodes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Diagnosis Code</h3>
              <button onClick={() => setShowDiagnosisCodes(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-96 space-y-2">
              {commonDiagnoses.map((diagnosis) => (
                <button
                  key={diagnosis.code}
                  onClick={() => handleAddDiagnosis(diagnosis)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{diagnosis.code}</span>
                    <span className="text-gray-900 text-sm">{diagnosis.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Note Modal - Enhanced */}
      {showNewNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Clinical Note</h3>
              <button onClick={() => setShowNewNote(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  value={newNote.patientName}
                  onChange={(e) => setNewNote({...newNote, patientName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select patient...</option>
                  <option value="John Doe">John Doe (58, Male)</option>
                  <option value="Emily Davis">Emily Davis (32, Female)</option>
                  <option value="Michael Chen">Michael Chen (45, Male)</option>
                  <option value="Sarah Wilson">Sarah Wilson (67, Female)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note Type</label>
                <select
                  value={newNote.type}
                  onChange={(e) => setNewNote({...newNote, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  {noteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newNote.priority}
                  onChange={(e) => setNewNote({...newNote, priority: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up</label>
                <input
                  type="text"
                  value={newNote.followUp}
                  onChange={(e) => setNewNote({...newNote, followUp: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2 weeks, 3 months, PRN"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
                <textarea
                  value={newNote.chiefComplaint}
                  onChange={(e) => setNewNote({...newNote, chiefComplaint: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Brief description of the patient's main concern..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateNote}
                disabled={!newNote.patientName || !newNote.type || !newNote.chiefComplaint}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg"
              >
                Create Note
              </button>
              <button
                onClick={() => setShowNewNote(false)}
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

export default ClinicalNotes;
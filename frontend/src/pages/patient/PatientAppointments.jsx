import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, Search, Filter, Plus, ChevronLeft, ChevronRight, Video, Star, AlertCircle, CheckCircle, X } from 'lucide-react';

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock appointment data
  const [appointments] = useState([
    {
      id: 1,
      date: '2024-12-20',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Heart Health Center - Room 201',
      address: '123 Medical Plaza, Suite 201',
      phone: '(555) 123-4567',
      isVirtual: false,
      notes: 'Hypertension follow-up',
      duration: '30 minutes'
    },
    {
      id: 2,
      date: '2024-12-25',
      time: '2:30 PM',
      doctor: 'Dr. Michael Johnson',
      specialty: 'General Practice',
      type: 'Annual Check-up',
      status: 'confirmed',
      location: 'Primary Care Clinic - Room 105',
      address: '456 Health Ave, First Floor',
      phone: '(555) 234-5678',
      isVirtual: false,
      notes: 'Annual physical examination',
      duration: '45 minutes'
    },
    {
      id: 3,
      date: '2024-12-28',
      time: '11:00 AM',
      doctor: 'Dr. Emily Chen',
      specialty: 'Dermatology',
      type: 'Consultation',
      status: 'pending',
      location: 'Virtual Meeting',
      address: 'Online',
      phone: '(555) 345-6789',
      isVirtual: true,
      notes: 'Skin condition consultation',
      duration: '30 minutes'
    }
  ]);

  const [pastAppointments] = useState([
    {
      id: 4,
      date: '2024-12-15',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      type: 'Follow-up',
      status: 'completed',
      location: 'Heart Health Center - Room 201',
      notes: 'BP medication adjustment',
      summary: 'Blood pressure well controlled. Continue current medications.'
    },
    {
      id: 5,
      date: '2024-11-20',
      time: '9:00 AM',
      doctor: 'Dr. Michael Johnson',
      specialty: 'General Practice',
      type: 'Check-up',
      status: 'completed',
      location: 'Primary Care Clinic - Room 105',
      notes: 'Routine visit',
      summary: 'Overall health good. Lab results normal.'
    }
  ]);

  // Mock available doctors
  const [availableDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 142,
      location: 'Heart Health Center',
      phone: '(555) 123-4567',
      email: 'sarah.smith@healthcare.com',
      image: '/api/placeholder/150/150',
      bio: 'Board-certified cardiologist with 15 years of experience.',
      availableSlots: [
        { date: '2024-12-21', times: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] },
        { date: '2024-12-22', times: ['9:00 AM', '11:00 AM', '1:00 PM'] },
        { date: '2024-12-23', times: ['10:00 AM', '2:30 PM', '4:00 PM'] }
      ],
      nextAvailable: '2024-12-21'
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      specialty: 'General Practice',
      rating: 4.8,
      reviews: 98,
      location: 'Primary Care Clinic',
      phone: '(555) 234-5678',
      email: 'michael.johnson@healthcare.com',
      image: '/api/placeholder/150/150',
      bio: 'Family medicine physician focused on preventive care.',
      availableSlots: [
        { date: '2024-12-21', times: ['8:00 AM', '9:30 AM', '11:00 AM', '2:00 PM'] },
        { date: '2024-12-22', times: ['9:00 AM', '10:30 AM', '3:00 PM'] },
        { date: '2024-12-24', times: ['9:00 AM', '11:30 AM'] }
      ],
      nextAvailable: '2024-12-21'
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      specialty: 'Dermatology',
      rating: 4.9,
      reviews: 76,
      location: 'Skin Care Specialists',
      phone: '(555) 345-6789',
      email: 'emily.chen@healthcare.com',
      image: '/api/placeholder/150/150',
      bio: 'Dermatologist specializing in medical and cosmetic dermatology.',
      availableSlots: [
        { date: '2024-12-23', times: ['10:00 AM', '11:30 AM', '1:00 PM'] },
        { date: '2024-12-24', times: ['9:00 AM', '2:00 PM'] },
        { date: '2024-12-26', times: ['10:30 AM', '12:00 PM', '3:00 PM'] }
      ],
      nextAvailable: '2024-12-23'
    },
    {
      id: 4,
      name: 'Dr. Robert Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 124,
      location: 'Bone & Joint Center',
      phone: '(555) 456-7890',
      email: 'robert.wilson@healthcare.com',
      image: '/api/placeholder/150/150',
      bio: 'Orthopedic surgeon with expertise in sports medicine.',
      availableSlots: [
        { date: '2024-12-22', times: ['8:00 AM', '10:00 AM', '1:30 PM'] },
        { date: '2024-12-23', times: ['9:30 AM', '11:00 AM'] },
        { date: '2024-12-26', times: ['8:30 AM', '2:00 PM', '4:00 PM'] }
      ],
      nextAvailable: '2024-12-22'
    }
  ]);

  const specialties = ['all', 'Cardiology', 'General Practice', 'Dermatology', 'Orthopedics', 'Neurology', 'Pediatrics'];

  const filteredDoctors = availableDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      // Here you would typically make an API call to book the appointment
      alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`);
      setShowBooking(false);
      setSelectedDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
    }
  };

  const renderUpcomingAppointments = () => (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                {appointment.isVirtual && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Video size={12} />
                    Virtual
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600"><strong>Specialty:</strong> {appointment.specialty}</p>
                  <p className="text-gray-600"><strong>Type:</strong> {appointment.type}</p>
                  <p className="text-gray-600"><strong>Duration:</strong> {appointment.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600"><strong>Date:</strong> {appointment.date}</p>
                  <p className="text-gray-600"><strong>Time:</strong> {appointment.time}</p>
                  <p className="text-gray-600"><strong>Location:</strong> {appointment.location}</p>
                </div>
              </div>
              {appointment.notes && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800"><strong>Notes:</strong> {appointment.notes}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                <MapPin size={16} />
                Get Directions
              </button>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                <Phone size={16} />
                Call Office
              </button>
              {appointment.isVirtual && (
                <button className="flex items-center gap-2 text-green-600 hover:text-green-800 text-sm">
                  <Video size={16} />
                  Join Meeting
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded text-sm">
                Reschedule
              </button>
              <button className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPastAppointments = () => (
    <div className="space-y-4">
      {pastAppointments.map((appointment) => (
        <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600"><strong>Specialty:</strong> {appointment.specialty}</p>
                  <p className="text-gray-600"><strong>Type:</strong> {appointment.type}</p>
                </div>
                <div>
                  <p className="text-gray-600"><strong>Date:</strong> {appointment.date}</p>
                  <p className="text-gray-600"><strong>Time:</strong> {appointment.time}</p>
                </div>
              </div>
              {appointment.summary && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800"><strong>Visit Summary:</strong> {appointment.summary}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              View Full Report
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Book Follow-up
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBookAppointment = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search doctors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty === 'all' ? 'All Specialties' : specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{doctor.location}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{doctor.bio}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Next available: {doctor.nextAvailable}
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.availableSlots[0]?.times.slice(0, 3).map((time, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {time}
                  </span>
                ))}
                {doctor.availableSlots[0]?.times.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{doctor.availableSlots[0].times.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => {setSelectedDoctor(doctor); setShowBooking(true);}}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
              >
                Book Appointment
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>
        <button
          onClick={() => setActiveTab('book')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Book Appointment
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {[
          { id: 'upcoming', label: 'Upcoming', icon: Calendar },
          { id: 'past', label: 'Past Appointments', icon: Clock },
          { id: 'book', label: 'Book New', icon: Plus }
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

      {/* Tab Content */}
      {activeTab === 'upcoming' && renderUpcomingAppointments()}
      {activeTab === 'past' && renderPastAppointments()}
      {activeTab === 'book' && renderBookAppointment()}

      {/* Appointment Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Book Appointment with {selectedDoctor.name}
              </h3>
              <button
                onClick={() => {setShowBooking(false); setSelectedDoctor(null);}}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                  <p className="text-blue-600">{selectedDoctor.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.location}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDoctor.availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      onClick={() => setSelectedDate(slot.date)}
                      className={`p-3 border rounded-lg text-sm ${
                        selectedDate === slot.date
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {new Date(slot.date).toLocaleDateString('en', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedDoctor.availableSlots
                      .find(slot => slot.date === selectedDate)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 border rounded-lg text-sm ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Appointment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>Select reason...</option>
                  <option>Annual Check-up</option>
                  <option>Follow-up Visit</option>
                  <option>New Concern</option>
                  <option>Consultation</option>
                  <option>Prescription Review</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Describe your symptoms or concerns..."
                ></textarea>
              </div>

              {/* Appointment Summary */}
              {selectedDate && selectedTime && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
                  <div className="text-sm text-blue-800">
                    <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                    <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Location:</strong> {selectedDoctor.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => {setShowBooking(false); setSelectedDoctor(null); setSelectedDate(''); setSelectedTime('');}}
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

export default PatientAppointments;
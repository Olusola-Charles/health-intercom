import React, { useState } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, User, Video, Phone, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';

const DoctorSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('week'); // day, week, month
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock appointments data
  const [appointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      date: '2024-12-16',
      startTime: '09:00',
      endTime: '09:30',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 201',
      notes: 'Hypertension follow-up',
      phone: '(555) 123-4567',
      isVirtual: false
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientId: 'P002',
      date: '2024-12-16',
      startTime: '10:00',
      endTime: '10:45',
      type: 'Consultation',
      status: 'confirmed',
      location: 'Room 201',
      notes: 'Chest pain evaluation',
      phone: '(555) 234-5678',
      isVirtual: false
    },
    {
      id: 3,
      patientName: 'Michael Chen',
      patientId: 'P003',
      date: '2024-12-16',
      startTime: '14:00',
      endTime: '14:30',
      type: 'Check-up',
      status: 'pending',
      location: 'Virtual',
      notes: 'Annual physical results review',
      phone: '(555) 345-6789',
      isVirtual: true
    },
    {
      id: 4,
      patientName: 'Sarah Wilson',
      patientId: 'P004',
      date: '2024-12-17',
      startTime: '11:00',
      endTime: '11:30',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'Room 205',
      notes: 'Arthritis management',
      phone: '(555) 456-7890',
      isVirtual: false
    },
    {
      id: 5,
      patientName: 'David Brown',
      patientId: 'P005',
      date: '2024-12-18',
      startTime: '15:30',
      endTime: '16:00',
      type: 'Consultation',
      status: 'cancelled',
      location: 'Room 201',
      notes: 'Patient cancelled - reschedule needed',
      phone: '(555) 567-8901',
      isVirtual: false
    }
  ]);

  // Default availability template
  const [availability] = useState({
    monday: { start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    tuesday: { start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    wednesday: { start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    thursday: { start: '08:00', end: '17:00', breakStart: '12:00', breakEnd: '13:00' },
    friday: { start: '08:00', end: '16:00', breakStart: '12:00', breakEnd: '13:00' },
    saturday: { start: '09:00', end: '13:00', breakStart: '', breakEnd: '' },
    sunday: { start: '', end: '', breakStart: '', breakEnd: '' }
  });

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      week.push(weekDay);
    }
    return week;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date);
    return appointments.filter(apt => 
      apt.date === dateStr && 
      (filterStatus === 'all' || apt.status === filterStatus)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 border-r border-gray-200">
            <div className="text-sm font-medium text-gray-600">Time</div>
          </div>
          {weekDates.map((date, index) => (
            <div key={index} className={`p-4 border-r border-gray-200 text-center ${
              isToday(date) ? 'bg-blue-50' : ''
            }`}>
              <div className="text-sm font-medium text-gray-900">
                {date.toLocaleDateString('en', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-semibold ${
                isToday(date) ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-2 border-r border-gray-200 text-sm text-gray-600 bg-gray-50">
                {time}
              </div>
              {weekDates.map((date, dayIndex) => {
                const dayAppointments = getAppointmentsForDate(date);
                const appointment = dayAppointments.find(apt => apt.startTime === time);
                
                return (
                  <div
                    key={dayIndex}
                    className="p-1 border-r border-gray-200 min-h-[60px] relative cursor-pointer hover:bg-gray-50"
                    onClick={() => !appointment && setSelectedTimeSlot({ date: formatDate(date), time })}
                  >
                    {appointment && (
                      <div className={`p-2 rounded text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                        <div className="font-semibold">{appointment.patientName}</div>
                        <div className="flex items-center gap-1">
                          {appointment.isVirtual ? (
                            <Video size={12} />
                          ) : (
                            <User size={12} />
                          )}
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>
          <div className="p-4 space-y-2">
            {timeSlots.map((time) => {
              const appointment = dayAppointments.find(apt => apt.startTime === time);
              
              return (
                <div key={time} className="flex items-center gap-4 py-2 border-b border-gray-100">
                  <div className="w-16 text-sm text-gray-600">{time}</div>
                  <div className="flex-1">
                    {appointment ? (
                      <div className={`p-3 rounded border ${getStatusColor(appointment.status)}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{appointment.patientName}</div>
                            <div className="text-sm">{appointment.type}</div>
                            <div className="text-xs">{appointment.location}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {appointment.isVirtual ? (
                              <Video size={16} className="text-blue-600" />
                            ) : (
                              <User size={16} className="text-gray-600" />
                            )}
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="p-3 border-2 border-dashed border-gray-300 rounded text-center text-gray-500 hover:border-blue-300 hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedTimeSlot({ date: formatDate(currentDate), time })}
                      >
                        Available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">{dayAppointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Confirmed</span>
                <span className="font-semibold text-green-600">
                  {dayAppointments.filter(a => a.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Virtual</span>
                <span className="font-semibold text-blue-600">
                  {dayAppointments.filter(a => a.isVirtual).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Slots</span>
                <span className="font-semibold text-gray-600">
                  {timeSlots.length - dayAppointments.length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => setShowAddAppointment(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm"
              >
                Add Appointment
              </button>
              <button 
                onClick={() => setShowAvailability(true)}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm"
              >
                Manage Availability
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm">
                Block Time Off
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-600">Manage your appointments and availability</p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['day', 'week', 'month'].map((view) => (
              <button
                key={view}
                onClick={() => setViewType(view)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === view
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddAppointment(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            New Appointment
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => navigateWeek(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
          >
            Today
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            {viewType === 'week' ? (
              `Week of ${getWeekDates(currentDate)[0].toLocaleDateString()}`
            ) : (
              currentDate.toLocaleDateString('en', { 
                month: 'long', 
                year: 'numeric',
                ...(viewType === 'day' && { day: 'numeric', weekday: 'long' })
              })
            )}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Calendar View */}
      {viewType === 'week' && renderWeekView()}
      {viewType === 'day' && renderDayView()}
      {viewType === 'month' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center text-gray-500">
            <Calendar size={64} className="mx-auto mb-4" />
            <p>Month view coming soon...</p>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {(showAddAppointment || selectedTimeSlot) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Schedule Appointment</h3>
              <button
                onClick={() => {setShowAddAppointment(false); setSelectedTimeSlot(null);}}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="">Select patient...</option>
                  <option value="P001">John Doe</option>
                  <option value="P002">Emily Davis</option>
                  <option value="P003">Michael Chen</option>
                  <option value="P004">Sarah Wilson</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    defaultValue={selectedTimeSlot?.date || formatDate(currentDate)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select 
                    defaultValue={selectedTimeSlot?.time || ''}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select time...</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="">Select type...</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="check-up">Check-up</option>
                  <option value="procedure">Procedure</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option value="room-201">Room 201</option>
                  <option value="room-205">Room 205</option>
                  <option value="virtual">Virtual Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Additional notes..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Schedule Appointment
              </button>
              <button
                onClick={() => {setShowAddAppointment(false); setSelectedTimeSlot(null);}}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Availability Settings Modal */}
      {showAvailability && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Manage Availability</h3>
              <button
                onClick={() => setShowAvailability(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span>&times;</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(availability).map(([day, hours]) => (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 capitalize">{day}</h4>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.start !== ''}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Available</span>
                    </label>
                  </div>
                  
                  {hours.start && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                        <input
                          type="time"
                          defaultValue={hours.start}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">End Time</label>
                        <input
                          type="time"
                          defaultValue={hours.end}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Break Start</label>
                        <input
                          type="time"
                          defaultValue={hours.breakStart}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Break End</label>
                        <input
                          type="time"
                          defaultValue={hours.breakEnd}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Save Availability
              </button>
              <button
                onClick={() => setShowAvailability(false)}
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

export default DoctorSchedule;
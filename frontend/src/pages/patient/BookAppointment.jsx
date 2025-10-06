import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorsAPI, appointmentsAPI } from '../../services/api';
import { Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate && doctorId) {
      fetchAvailableSlots();
    }
  }, [selectedDate, doctorId]);

  const fetchDoctor = async () => {
    try {
      const response = await doctorsAPI.getById(doctorId);
      setDoctor(response.data);
    } catch (error) {
      setError('Failed to load doctor information');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await appointmentsAPI.getAvailableSlots(doctorId, selectedDate);
      setAvailableSlots(response.data?.availableSlots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots([]);
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setSubmitting(true);

//   if (!selectedDate || !selectedTime) {
//     setError('Please select a date and time');
//     setSubmitting(false);
//     return;
//   }

//   try {
//     await appointmentsAPI.create({
//       doctorId: doctorId,  // Remove parseInt - keep as string
//       appointmentDate: selectedDate,
//       appointmentTime: selectedTime,
//       reason,
//       symptoms: [notes]  // Changed from "notes" to "symptoms" array
//     });

//     setSuccess(true);
//     setTimeout(() => {
//       navigate('/patient/appointments');
//     }, 2000);
//   } catch (error) {
//     setError(error.message || 'Failed to book appointment');
//   } finally {
//     setSubmitting(false);
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('=== FORM SUBMISSION START ===');
  
  setError('');
  setSubmitting(true);

  if (!selectedDate || !selectedTime) {
    console.log('Missing date or time');
    setError('Please select a date and time');
    setSubmitting(false);
    return;
  }

  const appointmentData = {
    doctorId: doctorId,
    appointmentDate: selectedDate,
    appointmentTime: selectedTime,
    reason,
    symptoms: notes ? [notes] : []
  };

  console.log('Appointment data:', appointmentData);
  console.log('appointmentsAPI:', appointmentsAPI);

  try {
    console.log('Calling API...');
    const response = await appointmentsAPI.create(appointmentData);
    console.log('API Response:', response);
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);

    setSuccess(true);
    setTimeout(() => {
      navigate('/patient/appointments');
    }, 2000);
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
    setError(error.message || 'Failed to book appointment');
  } finally {
    setSubmitting(false);
  }
};

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Doctor not found</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h2>
          <p className="text-green-700">Your appointment has been successfully scheduled.</p>
          <p className="text-sm text-green-600 mt-4">Redirecting to your appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="text-center mb-4">
              <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {doctor.firstName?.[0]}{doctor.lastName?.[0]}
                </span>
              </div>
              <h3 className="text-xl font-semibold">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              <p className="text-blue-600">{doctor.specialization}</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee:</span>
                <span className="font-medium">${doctor.consultationFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <AlertCircle className="text-red-600 mr-2 flex-shrink-0" size={20} />
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={18} />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime('');
                  }}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Time Slot Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline mr-2" size={18} />
                    Select Time Slot
                  </label>
                  {availableSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No available slots for this date</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            selectedTime === slot
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g., General checkup, Follow-up, Consultation"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific symptoms or concerns?"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !selectedDate || !selectedTime}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {submitting ? 'Booking...' : 'Confirm Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
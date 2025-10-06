// frontend/src/components/doctors/DoctorList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorsAPI } from '../../services/api';
import { Stethoscope, Star, DollarSign, Calendar, Search } from 'lucide-react';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await doctorsAPI.getAll(filters);
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {};
    if (search) filters.search = search;
    if (specialtyFilter) filters.specialization = specialtyFilter;
    fetchDoctors(filters);
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/patient/book-appointment/${doctorId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or specialization"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No doctors found. Try adjusting your search.
          </div>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              {/* Doctor Image */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  {doctor.profileImage ? (
                    <img
                      src={doctor.profileImage}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <Stethoscope size={40} className="text-blue-600" />
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              <h3 className="text-xl font-semibold text-center mb-2">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>
              
              <p className="text-blue-600 text-center mb-4">
                {doctor.specialization}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Star size={16} className="mr-1 text-yellow-500" />
                    Rating
                  </span>
                  <span className="font-medium">
                    {doctor.rating || 'N/A'} ({doctor.totalRatings || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <DollarSign size={16} className="mr-1 text-green-500" />
                    Consultation Fee
                  </span>
                  <span className="font-medium">${doctor.consultationFee}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{doctor.yearsOfExperience || 'N/A'} years</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => handleBookAppointment(doctor.id)}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Calendar size={18} className="mr-2" />
                Book Appointment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
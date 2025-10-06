// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (email, password) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Store token
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },

  changePassword: async (currentPassword, newPassword) => {
    return apiCall('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
};

// Doctors API
export const doctorsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/doctors?${params}`);
  },

  getById: async (id) => {
    return apiCall(`/doctors/${id}`);
  },

  getDashboard: async () => {
    return apiCall('/doctors/me/dashboard');
  },
};

// Appointments API
export const appointmentsAPI = {
  getAll: async () => {
    return apiCall('/appointments');
  },

  getById: async (id) => {
    return apiCall(`/appointments/${id}`);
  },

  create: async (appointmentData) => {
    return apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  updateStatus: async (id, status, notes) => {
    return apiCall(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },

  cancel: async (id, reason) => {
    return apiCall(`/appointments/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });
  },

  getAvailableSlots: async (doctorId, date) => {
    return apiCall(`/appointments/available-slots/${doctorId}?date=${date}`);
  },
};

// Patients API
export const patientsAPI = {
  getDashboard: async () => {
    return apiCall('/patients/me/dashboard');
  },

  updateProfile: async (profileData) => {
    return apiCall('/patients/me/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiCall('/health');
  },
};
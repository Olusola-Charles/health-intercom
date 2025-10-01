// src/utils/authUtils.jsx

// Demo user data (in real app, this would come from your backend)
export const demoUsers = {
  // Admin users
  'admin@hic.com': {
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator',
    id: 'admin_001'
  },
  'admin.sarah@hic.com': {
    password: 'admin123',
    role: 'admin',
    name: 'Sarah Admin',
    id: 'admin_002'
  },
  
  // Doctor users
  'dr.smith@hic.com': {
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    id: 'doc_001'
  },
  'dr.williams@hic.com': {
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Michael Williams',
    specialty: 'Neurology',
    id: 'doc_002'
  },
  
  // Patient users
  'john.doe@email.com': {
    password: 'patient123',
    role: 'patient',
    name: 'John Doe',
    age: 35,
    id: 'pat_001'
  },
  'jane.smith@email.com': {
    password: 'patient123',
    role: 'patient',
    name: 'Jane Smith',
    age: 28,
    id: 'pat_002'
  }
};

// Authentication utility functions
export const authenticateUser = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const userData = demoUsers[email.toLowerCase()];
  
  if (userData && userData.password === password) {
    // Remove password from returned user data
    const { password: _, ...userWithoutPassword } = userData;
    return { 
      success: true, 
      user: { ...userWithoutPassword, email } 
    };
  } else {
    return { 
      success: false, 
      error: 'Invalid email or password' 
    };
  }
};

// Utility to get user role
export const getUserRole = (email) => {
  const userData = demoUsers[email?.toLowerCase()];
  return userData?.role || null;
};

// Utility to check if user exists
export const userExists = (email) => {
  return !!demoUsers[email?.toLowerCase()];
};
// src/hooks/useAuth.jsx
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext'; // Default import

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Default export as well
export default useAuth;
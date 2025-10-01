// src/components/auth/AuthProvider.jsx
import React, { useState } from 'react';
import AuthContext from '../../contexts/AuthContext'; // Default import
import { authenticateUser } from '../../utils/authUtils';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      const result = await authenticateUser(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsLoading(false);
        return { success: true, user: result.user };
      } else {
        setIsLoading(false);
        return { success: false, error: result.error };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    // In a real app, you might also clear localStorage/sessionStorage here
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
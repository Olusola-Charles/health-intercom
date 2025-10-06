import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const { user, loading: isLoading, login: contextLogin, logout: contextLogout } = context;

  const login = async (email, password) => {
    try {
      const response = await contextLogin(email, password);
      
      return { 
        success: true, 
        user: response.data.user 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Invalid email or password. Please try again.' 
      };
    }
  };

  const logout = () => {
    contextLogout();
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
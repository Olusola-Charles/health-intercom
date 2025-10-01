// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, Stethoscope, Heart, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../common/Logo';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('');
  
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedDemo(demoEmail);
    
    // Auto-login after setting credentials
    setTimeout(async () => {
      setError('');
      const result = await login(demoEmail, demoPassword);
      if (!result.success) {
        setError(result.error);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your healthcare account</p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">🔑 Demo Accounts (Click to auto-fill):</h3>
          
          <div className="space-y-2">
            {/* Admin Demo */}
            <div className="bg-white rounded p-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-red-500" />
                  Admin Access
                </h4>
              </div>
              <button
                onClick={() => handleDemoLogin('admin@hic.com', 'admin123')}
                className={`text-sm text-left w-full hover:bg-gray-50 p-2 rounded transition-colors ${selectedDemo === 'admin@hic.com' ? 'bg-blue-100' : ''}`}
              >
                <strong>admin@hic.com</strong> / admin123
                <br />
                <span className="text-gray-600 text-xs">System Administrator Dashboard</span>
              </button>
            </div>

            {/* Doctor Demo */}
            <div className="bg-white rounded p-3 border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 text-green-500" />
                  Doctor Access
                </h4>
              </div>
              <button
                onClick={() => handleDemoLogin('dr.smith@hic.com', 'doctor123')}
                className={`text-sm text-left w-full hover:bg-gray-50 p-2 rounded transition-colors ${selectedDemo === 'dr.smith@hic.com' ? 'bg-blue-100' : ''}`}
              >
                <strong>dr.smith@hic.com</strong> / doctor123
                <br />
                <span className="text-gray-600 text-xs">Dr. Sarah Smith - Cardiology</span>
              </button>
            </div>

            {/* Patient Demo */}
            <div className="bg-white rounded p-3 border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-800 flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-blue-500" />
                  Patient Access
                </h4>
              </div>
              <button
                onClick={() => handleDemoLogin('john.doe@email.com', 'patient123')}
                className={`text-sm text-left w-full hover:bg-gray-50 p-2 rounded transition-colors ${selectedDemo === 'john.doe@email.com' ? 'bg-blue-100' : ''}`}
              >
                <strong>john.doe@email.com</strong> / patient123
                <br />
                <span className="text-gray-600 text-xs">John Doe - Patient Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-6 bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
              Contact administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
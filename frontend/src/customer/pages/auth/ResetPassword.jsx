import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import customerApi from '../../../shared/services/customerApi';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (!token) {
        setErrors({
          general: 'Invalid or missing reset token. Please request a new password reset.'
        });
        return;
      }
      
      setLoading(true);
      try {
        const response = await customerApi.resetPassword(token, formData.password);
        console.log('Password reset successful:', response);
        setIsReset(true);
      } catch (error) {
        console.error('Password reset failed:', error);
        setErrors({
          general: error.message || 'Failed to reset password. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (isReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-customer-primary/10 to-customer-secondary/10 flex items-center justify-center p-4">
        <div className="customer-glass-card w-full max-w-md p-8 rounded-2xl text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-customer-primary/10">
            <Lock className="h-8 w-8 text-customer-primary" />
          </div>
          <h1 className="text-2xl font-bold text-customer-gray-900 mt-6">Password Reset Successful</h1>
          <p className="mt-2 text-customer-gray-600">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/login')}
              className="customer-btn-primary w-full"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customer-primary/10 to-customer-secondary/10 flex items-center justify-center p-4">
      <div className="customer-glass-card w-full max-w-md p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-customer-primary mb-2">Reset Password</h1>
          <p className="text-customer-gray-600">
            Enter your new password below.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-customer-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`customer-input pl-10 w-full ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 hover:text-customer-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-customer-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`customer-input pl-10 w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 hover:text-customer-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="customer-btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-customer-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-customer-primary font-medium hover:text-customer-secondary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
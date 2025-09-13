import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import customerApi from '../../../shared/services/customerApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await customerApi.forgotPassword(email);
        console.log('Password reset request sent:', response);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Password reset request failed:', error);
        setErrors({
          general: error.message || 'Failed to send reset link. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await customerApi.forgotPassword(email);
      console.log('Password reset link resent:', response);
    } catch (error) {
      console.error('Failed to resend reset link:', error);
      setErrors({
        general: error.message || 'Failed to resend reset link. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-customer-primary/10 to-customer-secondary/10 flex items-center justify-center p-4">
        <div className="customer-glass-card w-full max-w-md p-8 rounded-2xl text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-customer-primary/10">
            <Mail className="h-8 w-8 text-customer-primary" />
          </div>
          <h1 className="text-2xl font-bold text-customer-gray-900 mt-6">Check your email</h1>
          <p className="mt-2 text-customer-gray-600">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/login')}
              className="customer-btn-primary w-full"
            >
              Back to Login
            </button>
          </div>
          <div className="mt-6">
            <p className="text-sm text-customer-gray-600">
              Didn't receive the email?{' '}
              <button 
                onClick={handleResend}
                disabled={loading}
                className="font-medium text-customer-primary hover:text-customer-secondary"
              >
                {loading ? 'Sending...' : 'Click to resend'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-customer-primary/10 to-customer-secondary/10 flex items-center justify-center p-4">
      <div className="customer-glass-card w-full max-w-md p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-customer-primary mb-2">Forgot Password?</h1>
          <p className="text-customer-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-customer-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`customer-input pl-10 w-full ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
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
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
        
        <div className="mt-6">
          <Link 
            to="/login" 
            className="flex items-center justify-center text-customer-primary hover:text-customer-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
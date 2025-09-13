import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Password reset logic would go here
      console.log('Password reset request for:', email);
      setIsSubmitted(true);
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
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-customer-primary hover:text-customer-secondary"
              >
                Click to resend
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
            className="customer-btn-primary w-full"
          >
            Send Reset Link
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
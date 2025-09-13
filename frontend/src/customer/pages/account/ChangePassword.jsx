import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

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
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Password change logic would go here
      console.log('Password changed with:', formData);
      setIsChanged(true);
    }
  };

  if (isChanged) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="customer-glass-card rounded-2xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-customer-primary/10 mb-6">
            <CheckCircle className="h-8 w-8 text-customer-primary" />
          </div>
          <h1 className="text-2xl font-bold text-customer-gray-900 mb-2">Password Changed Successfully</h1>
          <p className="text-customer-gray-600 mb-8">
            Your password has been updated. For security reasons, you'll need to sign in again with your new password.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="customer-btn-primary">
              Sign In
            </Link>
            <Link to="/account/profile" className="customer-btn-secondary">
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-customer-gray-900">Change Password</h1>
        <p className="text-customer-gray-600">Update your account password</p>
      </div>
      
      <div className="customer-glass-card rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-customer-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className={`customer-input pl-10 w-full ${errors.currentPassword ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 hover:text-customer-gray-600"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.currentPassword && <p className="mt-1 text-red-500 text-sm">{errors.currentPassword}</p>}
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-customer-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 w-5 h-5" />
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`customer-input pl-10 w-full ${errors.newPassword ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-gray-400 hover:text-customer-gray-600"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-red-500 text-sm">{errors.newPassword}</p>}
            
            <div className="mt-3 text-sm text-customer-gray-600">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>At least 6 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
              </ul>
            </div>
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
          
          <div className="flex justify-end gap-4 pt-4">
            <Link to="/account/profile" className="customer-btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="customer-btn-primary"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
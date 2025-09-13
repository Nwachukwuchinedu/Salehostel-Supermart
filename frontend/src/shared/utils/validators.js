// Validation functions

// Validate required field
export const validateRequired = (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return 'This field is required';
  }
  return null;
};

// Validate email
export const validateEmail = (email) => {
  if (!email) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

// Validate password
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
};

// Validate password confirmation
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Validate phone number
export const validatePhoneNumber = (phone) => {
  if (!phone) return null;
  
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

// Validate URL
export const validateUrl = (url) => {
  if (!url) return null;
  
  try {
    new URL(url);
    return null;
  } catch (_) {
    return 'Please enter a valid URL';
  }
};

// Validate number
export const validateNumber = (value) => {
  if (!value && value !== 0) return null;
  
  if (isNaN(value)) {
    return 'Please enter a valid number';
  }
  
  return null;
};

// Validate positive number
export const validatePositiveNumber = (value) => {
  if (!value && value !== 0) return null;
  
  if (isNaN(value) || value < 0) {
    return 'Please enter a positive number';
  }
  
  return null;
};

// Validate integer
export const validateInteger = (value) => {
  if (!value && value !== 0) return null;
  
  if (!Number.isInteger(Number(value))) {
    return 'Please enter a whole number';
  }
  
  return null;
};

// Validate array minimum length
export const validateMinLength = (array, minLength) => {
  if (!array || array.length < minLength) {
    return `At least ${minLength} items are required`;
  }
  return null;
};

// Validate string minimum length
export const validateMinStringLength = (value, minLength) => {
  if (!value) return null;
  
  if (value.length < minLength) {
    return `Must be at least ${minLength} characters`;
  }
  
  return null;
};

// Validate string maximum length
export const validateMaxStringLength = (value, maxLength) => {
  if (!value) return null;
  
  if (value.length > maxLength) {
    return `Must be no more than ${maxLength} characters`;
  }
  
  return null;
};

// Validate file type
export const validateFileType = (file, allowedTypes) => {
  if (!file) return null;
  
  const fileType = file.type.split('/')[1];
  if (!allowedTypes.includes(fileType)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

// Validate file size
export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return null;
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  
  return null;
};

// Run multiple validations
export const runValidations = (validations) => {
  for (const validation of validations) {
    const error = validation();
    if (error) {
      return error;
    }
  }
  return null;
};
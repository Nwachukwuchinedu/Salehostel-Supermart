import React from 'react';

const FormField = ({ 
  label, 
  children, 
  error, 
  helperText,
  required = false,
  className = ''
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-customer-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-customer-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;
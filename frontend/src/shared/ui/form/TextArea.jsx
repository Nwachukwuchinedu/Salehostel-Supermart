import React from 'react';

const TextArea = ({ 
  className = '', 
  error = false, 
  rows = 4,
  ...props 
}) => {
  const baseClasses = 'block w-full rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2';
  
  const defaultClasses = 'border-customer-gray-300 focus:border-customer-primary focus:ring-customer-primary/50';
  
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500/50';
  
  const classes = `${baseClasses} ${error ? errorClasses : defaultClasses} ${className}`;
  
  return (
    <textarea
      rows={rows}
      className={classes}
      {...props}
    />
  );
};

export default TextArea;
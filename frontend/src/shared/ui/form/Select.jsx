import React from 'react';

const Select = ({ 
  className = '', 
  error = false, 
  children,
  ...props 
}) => {
  const baseClasses = 'block w-full rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 appearance-none';
  
  const defaultClasses = 'border-customer-gray-300 focus:border-customer-primary focus:ring-customer-primary/50';
  
  const errorClasses = 'border-red-500 focus:border-red-500 focus:ring-red-500/50';
  
  const classes = `${baseClasses} ${error ? errorClasses : defaultClasses} ${className}`;
  
  return (
    <div className="relative">
      <select
        className={`${classes} pl-3 pr-10 py-2`}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-customer-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default Select;
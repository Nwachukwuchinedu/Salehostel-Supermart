import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '', 
  onClick, 
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-customer-primary hover:bg-customer-secondary text-white focus:ring-customer-primary/50',
    secondary: 'bg-customer-gray-100 hover:bg-customer-gray-200 text-customer-gray-900 focus:ring-customer-gray-500/50',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500/50',
    outline: 'border border-customer-gray-300 hover:bg-customer-gray-50 text-customer-gray-700 focus:ring-customer-gray-500/50',
    ghost: 'text-customer-primary hover:bg-customer-primary/10 focus:ring-customer-primary/50',
    link: 'text-customer-primary hover:text-customer-secondary underline focus:ring-customer-primary/50'
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
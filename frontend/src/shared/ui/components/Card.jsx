import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  header,
  footer,
  ...props 
}) => {
  return (
    <div className={`customer-glass-card rounded-2xl ${className}`} {...props}>
      {header && (
        <div className="border-b border-customer-gray-200 px-6 py-4">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="border-t border-customer-gray-200 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
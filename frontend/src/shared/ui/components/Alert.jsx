import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const Alert = ({ 
  children, 
  variant = 'info', 
  title,
  onClose,
  className = '',
  ...props 
}) => {
  const variantClasses = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  const iconClasses = 'w-5 h-5';

  const icons = {
    success: <CheckCircle className={iconClasses} />,
    error: <XCircle className={iconClasses} />,
    warning: <AlertCircle className={iconClasses} />,
    info: <Info className={iconClasses} />
  };

  return (
    <div 
      className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {icons[variant]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
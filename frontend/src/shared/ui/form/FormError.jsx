import React from "react";
import { AlertCircle } from "lucide-react";

const FormError = ({ children, className = "", showIcon = true, ...props }) => {
  if (!children) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm text-red-600 mt-1 ${className}`}
      {...props}
    >
      {showIcon && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </div>
  );
};

export default FormError;

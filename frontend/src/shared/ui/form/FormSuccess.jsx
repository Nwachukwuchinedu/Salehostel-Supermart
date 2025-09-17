import React from "react";
import { CheckCircle } from "lucide-react";

const FormSuccess = ({
  children,
  className = "",
  showIcon = true,
  ...props
}) => {
  if (!children) return null;

  return (
    <div
      className={`flex items-center gap-2 text-sm text-green-600 mt-1 ${className}`}
      {...props}
    >
      {showIcon && <CheckCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{children}</span>
    </div>
  );
};

export default FormSuccess;

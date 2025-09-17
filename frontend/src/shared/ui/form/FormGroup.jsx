import React from "react";

const FormGroup = ({ children, className = "", error, ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default FormGroup;

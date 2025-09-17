import React from "react";

const Spinner = ({
  size = "md",
  color = "primary",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    white: "text-white",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

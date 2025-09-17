import React from "react";

const Input = ({ className = "", type = "text", error = false, ...props }) => {
  const baseClasses =
    "block w-full rounded-lg border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2";

  const defaultClasses =
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500/50 px-3 py-2";

  const errorClasses =
    "border-red-500 focus:border-red-500 focus:ring-red-500/50";

  const classes = `${baseClasses} ${
    error ? errorClasses : defaultClasses
  } ${className}`;

  return <input type={type} className={classes} {...props} />;
};

export default Input;

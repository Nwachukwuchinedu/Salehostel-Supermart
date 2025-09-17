import React from "react";
import { User } from "lucide-react";

const Avatar = ({
  src,
  alt,
  size = "md",
  fallback,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8",
    "2xl": "w-10 h-10",
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`
        relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 overflow-hidden
        ${sizeClasses[size]} 
        ${className}
      `}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : fallback ? (
        <span className="font-semibold">{getInitials(fallback)}</span>
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  );
};

export default Avatar;

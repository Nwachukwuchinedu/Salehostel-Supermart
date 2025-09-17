import React from "react";

const Skeleton = ({
  className = "",
  variant = "rectangular",
  width,
  height,
  ...props
}) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";

  const variantClasses = {
    rectangular: "rounded",
    circular: "rounded-full",
    text: "rounded h-4",
  };

  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      {...props}
    />
  );
};

// Predefined skeleton components
export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton key={i} variant="text" className="w-full" />
    ))}
  </div>
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`}>
    <Skeleton className="w-full h-48 mb-4" />
    <Skeleton variant="text" className="w-3/4 mb-2" />
    <Skeleton variant="text" className="w-1/2 mb-2" />
    <Skeleton variant="text" className="w-full" />
  </div>
);

export const SkeletonAvatar = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <Skeleton
      variant="circular"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};

export const SkeletonButton = ({ className = "" }) => (
  <Skeleton className={`h-10 w-24 ${className}`} />
);

export default Skeleton;

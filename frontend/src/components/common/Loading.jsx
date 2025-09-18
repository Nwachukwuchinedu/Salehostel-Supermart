import React from "react";
import { Loader2 } from "lucide-react";

const Loading = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
  className = "",
}) => {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const content = (
    <div
      className={`flex flex-col items-center justify-center space-y-2 ${className}`}
    >
      <Loader2 className={`${sizes[size]} animate-spin text-primary-green`} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
};

// Skeleton Loading Components
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm animate-pulse">
    <div className="aspect-square bg-gray-300 rounded-t-lg"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-12 rounded-t-lg mb-2"></div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 mb-2">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="flex-1 h-8 bg-gray-200 rounded"></div>
        ))}
      </div>
    ))}
  </div>
);

export default Loading;

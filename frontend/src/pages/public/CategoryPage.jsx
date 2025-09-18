import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categorySlug } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Page</h1>
        <p className="text-gray-600">Category: {categorySlug}</p>
        <p className="text-sm text-gray-500 mt-4">
          This page will be implemented in Phase 2
        </p>
      </div>
    </div>
  );
};

export default CategoryPage;

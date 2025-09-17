import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import ProtectedRoute from "./ProtectedRoute";

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, hasRole } = useAuth();

  return (
    <ProtectedRoute>
      {allowedRoles.some((role) => hasRole(role)) ? (
        children
      ) : (
        <Navigate to="/login" replace />
      )}
    </ProtectedRoute>
  );
};

export default RoleBasedRoute;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./shared/hooks/useAuth.jsx";

// Shared Components
import LoginPage from "./shared/pages/LoginPage";
import LandingPage from "./shared/pages/LandingPage";
import LoadingSpinner from "./shared/components/LoadingSpinner";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import RoleBasedRoute from "./shared/components/RoleBasedRoute";

// Role-based Modules
import AdminModule from "./admin/AdminModule";
import SupplierModule from "./supplier/SupplierModule";
import StaffModule from "./staff/StaffModule";
import CustomerModule from "./customer/CustomerModule";

const AppRouter = () => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          isAuthenticated() ? (
            <Navigate to={`/${user.role}/dashboard`} replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Protected Role-based Routes */}
      <Route
        path="/admin/*"
        element={
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminModule />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/supplier/*"
        element={
          <RoleBasedRoute allowedRoles={["supplier"]}>
            <SupplierModule />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/staff/*"
        element={
          <RoleBasedRoute allowedRoles={["staff"]}>
            <StaffModule />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/customer/*"
        element={
          <RoleBasedRoute allowedRoles={["customer"]}>
            <CustomerModule />
          </RoleBasedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;

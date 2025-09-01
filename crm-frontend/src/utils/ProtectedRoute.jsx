// src/utils/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getDashboardRouteForRole } from "./roleAccess";

// Usage: <ProtectedRoute allowedRoles={["admin", "marketing"]} user={user}><Dashboard /></ProtectedRoute>
export default function ProtectedRoute({ allowedRoles, user, children }) {
  if (!user) {
    // Not logged in
    return <Navigate to="/employee-login" replace />;
  }
  const userRole = user.role?.toLowerCase();
  if (!allowedRoles.includes(userRole)) {
    // Logged in but not allowed for this dashboard
    return <Navigate to={getDashboardRouteForRole(userRole)} replace />;
  }
  return children;
}

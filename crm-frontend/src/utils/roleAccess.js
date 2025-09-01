// src/utils/roleAccess.js
// Centralized role-based access utility for dashboards/pages

export const roleDashboardMap = {
  admin: "/dashboard/admin",
  teamlead: "/dashboard/manager",
  marketing: "/dashboard/marketing",
  hr: "/dashboard/hr",
  verifier: "/dashboard/verifier",
  tech: "/dashboard/tech",
  support: "/dashboard/support",
  shared: "/dashboard/shared",
  recovery: "/dashboard/recovery",
  legal: "/dashboard/legal",
  operations: "/dashboard/operations",
  advisor: "/dashboard/advisor",
  customer: "/dashboard/customer",
};

export function getDashboardRouteForRole(role) {
  return roleDashboardMap[role?.toLowerCase()] || "/";
}

// Usage: getDashboardRouteForRole(user.role)

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  Users,
  FileText,
  LineChart,
  BadgeDollarSign,
  FolderOpen,
  CheckCircle,
  BarChart,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/employee/dashboard",
  },
  {
    title: "Administrator",
    icon: <UserCog size={20} />,
    children: [
      { title: "User Roles", path: "/admin/roles" },
      { title: "Users", path: "/admin/users" },
      { title: "Settings", path: "/admin/settings" },
    ],
  },
  {
    title: "Leads",
    icon: <Users size={20} />,
    path: "/employee/leads",
  },
  {
    title: "Loan Insight",
    icon: <FileText size={20} />,
    path: "/employee/applications",
  },
  {
    title: "Credit Analysis",
    icon: <LineChart size={20} />,
    path: "/employee/credit-analysis",
  },
  {
    title: "Operation",
    icon: <BadgeDollarSign size={20} />,
    path: "/employee/operations",
  },
  {
    title: "Disbursement",
    icon: <FolderOpen size={20} />,
    path: "/employee/disbursement",
  },
  {
    title: "Collection",
    icon: <CheckCircle size={20} />,
    path: "/employee/collections",
  },
  {
    title: "Report",
    icon: <BarChart size={20} />,
    path: "/employee/reports",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gradient-to-b from-blue-900 to-blue-600 text-white ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>CRM Panel</h1>
          <button onClick={toggleSidebar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item, index) =>
            item.children ? (
              <div key={index} className="px-4 py-2">
                <div className="flex items-center gap-3 text-sm font-semibold mb-1">
                  {item.icon}
                  {isOpen && item.title}
                </div>
                <div className="ml-6">
                  {item.children.map((child, i) => (
                    <NavLink
                      to={child.path}
                      key={i}
                      className={({ isActive }) =>
                        `block py-1 px-2 rounded text-sm ${
                          isActive ? "bg-blue-800 text-white" : "hover:bg-blue-700"
                        }`
                      }
                    >
                      {isOpen ? child.title : "•"}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-blue-800 text-white" : "hover:bg-blue-700"
                  }`
                }
              >
                {item.icon}
                {isOpen && item.title}
              </NavLink>
            )
          )}
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        {/* Put your <Outlet /> or content here in layout */}
        <h2 className="text-2xl font-semibold text-gray-700">Welcome to CRM</h2>
      </div>
    </div>
  );
};

export default Sidebar;

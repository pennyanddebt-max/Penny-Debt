import React from "react";
import { Routes, Route, Link } from "react-router-dom";


import Home from "./pages/Website/Home";
import Services from "./pages/Website/Services";
import About from "./pages/Website/About";
import ApplyForm from "./pages/Website/ApplyForm";
import Blog from "./pages/Website/Blog";
import Careers from "./pages/Website/Careers";
import Contact from "./pages/Website/Contact";
import FAQ from "./pages/Website/FAQ";
import PrivacyPolicy from "./pages/Website/PrivacyPolicy";
import Terms from "./pages/Website/Terms";


import ApplyLoan from "./pages/Website/ApplyLoan";
import ApplyLoanBasicDetails from "./pages/Website/ApplyLoanBasicDetails";

import MarketingDashboard from "./pages/crm/Dashboard/MarketingDashboard";
import AdminDashboard from "./pages/crm/Dashboard/AdminDashboard";
import ManagerDashboard from "./pages/crm/Dashboard/ManagerDashboard";
import SupportDashboard from "./pages/crm/Dashboard/SupportDashboard";
import CustomerDashboard from "./pages/crm/Dashboard/CustomerDashboard";
import EmployeeDashboard from "./pages/crm/Dashboard/EmployeeDashboard";
import StaffDashboard from "./pages/crm/Dashboard/StaffDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useMemo } from "react";

import Register from "./pages/crm/Customer/Register";
import Login from "./pages/crm/Customer/Login";
import Profile from "./pages/crm/Customer/Profile";
import CustomerHome from "./pages/crm/Customer/CustomerHome";

import CustomerLogin from "./pages/Auth/CustomerLogin";
import EmployeeLogin from "./pages/auth/EmployeeLogin";
import Signup from "./pages/Website/Signup";

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;

import Header from "./components/Header";

// Footer
const Footer = () => (
  <footer
    style={{
      position: "relative",
      color: "white",
      padding: "12px 24px 32px 24px",
      minHeight: 60,
      fontFamily,
      fontSize: 14,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      userSelect: "none",
      overflow: "hidden",
      background: "linear-gradient(90deg, #0070f3 0%, #6228d7 100%)",
      zIndex: 1,
      flexWrap: "wrap"
    }}
  >
    {/* Animated SVG Waves */}
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 32, zIndex: 0 }}>
      <svg width="100%" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0070f3" />
            <stop offset="1" stopColor="#6228d7" />
          </linearGradient>
        </defs>
        <path id="wavePath" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="url(#waveGradient)">
          <animate attributeName="d" dur="6s" repeatCount="indefinite"
            values="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z;
                    M0,40 C360,20 1080,60 1440,40 L1440,60 L0,60 Z;
                    M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </path>
      </svg>
    </div>
    {/* ...existing code... */}
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: "0.08em" }}>PENNY & DEBT</span>
      <span style={{ fontWeight: 600, fontSize: 14, marginLeft: 8 }}>Debt Settlement</span>
      <span style={{ fontWeight: 600, fontSize: 14, marginLeft: 8 }}>Loan Solutions</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span>Contact:</span>
      <span>Email: care@pennyanddebt.in</span>
      <span>Phone: +91 7814447895</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Link to="/terms" style={{ color: "white", textDecoration: "underline", fontSize: 14, marginRight: 8 }}>Terms & Conditions</Link>
      <Link to="/privacypolicy" style={{ color: "white", textDecoration: "underline", fontSize: 14, marginRight: 8 }}>Privacy Policy</Link>
      <span style={{ marginLeft: 8 }}>Follow Us:</span>
      <a href="https://twitter.com/pennyanddebt" aria-label="Twitter" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 8.5c0 .34.04.67.1.99C8.09 9.36 4.8 7.7 2.67 5.13c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.83 1.94 3.61-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.49 3.85 3.47 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.34 0-.67-.02-1-.06A12.13 12.13 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.2 8.2 0 0 1-2.36.65z"/></svg>
      </a>
      <a href="https://www.facebook.com/share/1YoinDZcbG/?mibextid=wwXIfr" aria-label="Facebook" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F3" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/pennydebt/?viewAsMember=true" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.25 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
      </a>
      <a href="https://www.instagram.com/pennydebt_?igsh=MWs3Mm1ic3k5djF0YQ==" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", marginLeft: 8 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><radialGradient id="insta-gradient" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f9ce34" /><stop offset="50%" stop-color="#ee2a7b" /><stop offset="100%" stop-color="#6228d7" /></radialGradient><rect width="24" height="24" rx="5" fill="url(#insta-gradient)" /><circle cx="12" cy="12" r="5" fill="white" /><circle cx="18" cy="6" r="1.5" fill="white" /></svg>
      </a>
    </div>
  </footer>
);

// App without BrowserRouter
export default function App() {
  // Get user from localStorage (employee or customer)
  const employee = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("employee"));
    } catch {
      return null;
    }
  }, []);
  const customer = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("customerUser"));
    } catch {
      return null;
    }
  }, []);

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "80vh",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 24px",
          fontFamily,
          color: "#2c3e50",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/applyform" element={<ApplyForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/services" element={<Services />} />
    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/applyloan" element={<ApplyLoan />} />
    <Route path="/applyloan-basic-details" element={<ApplyLoanBasicDetails />} />
          {/* Dashboard routes with role-based guards */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute allowedRoles={["admin"]} user={employee}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/manager" element={
            <ProtectedRoute allowedRoles={["teamlead","manager"]} user={employee}>
              <ManagerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/marketing" element={
            <ProtectedRoute allowedRoles={["marketing"]} user={employee}>
              <MarketingDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/support" element={
            <ProtectedRoute allowedRoles={["support"]} user={employee}>
              <SupportDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/customer" element={
            <ProtectedRoute allowedRoles={["customer"]} user={customer}>
              <CustomerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/employee" element={
            <ProtectedRoute allowedRoles={["employee"]} user={employee}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/staff" element={
            <ProtectedRoute allowedRoles={["staff"]} user={employee}>
              <StaffDashboard />
            </ProtectedRoute>
          } />
          {/* Website Auth */}
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

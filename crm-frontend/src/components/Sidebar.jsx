import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const activeStyle = { fontWeight: "700", color: "#0070f3" };
  return (
    <aside
      style={{
        width: 260,
        backgroundColor: "#fff",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
        height: "100vh",
        overflowY: "auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h3 style={{ color: "#0070f3", marginBottom: "20px", textAlign: "center" }}>
        Dashboard Menu
      </h3>

      <NavLink to="/dashboard" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Dashboard Home
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Admin</h4>
      <NavLink to="/dashboard/roles" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Roles
      </NavLink>
      <NavLink to="/dashboard/users" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Users
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Collection</h4>
      <NavLink to="/dashboard/collection/overdue-cases" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Overdue Cases
      </NavLink>
      <NavLink to="/dashboard/collection/repayment-tracker" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Repayment Tracker
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Credit</h4>
      <NavLink to="/dashboard/credit/bank-statement-analysis" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Bank Statement Analysis
      </NavLink>
      <NavLink to="/dashboard/credit/cibil-check" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        CIBIL Check
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Disbursement</h4>
      <NavLink to="/dashboard/disbursement/approved-loan" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Approved Loan
      </NavLink>
      <NavLink to="/dashboard/disbursement/disbursement-tracker" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Disbursement Tracker
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Leads</h4>
      <NavLink to="/dashboard/leads/create-lead" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Create Lead
      </NavLink>
      <NavLink to="/dashboard/leads/lead-list" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Lead List
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Loan Insight</h4>
      <NavLink to="/dashboard/loan-insight/loan-details" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Loan Details
      </NavLink>
      <NavLink to="/dashboard/loan-insight/loan-status" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Loan Status
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Operations</h4>
      <NavLink to="/dashboard/operations/document-verification" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Document Verification
      </NavLink>
      <NavLink to="/dashboard/operations/field-investigation" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Field Investigation
      </NavLink>

      <h4 style={{ marginTop: "20px", marginBottom: "8px" }}>Reports</h4>
      <NavLink to="/dashboard/reports/collection" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Collection Report
      </NavLink>
      <NavLink to="/dashboard/reports/disbursement" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Disbursement Report
      </NavLink>
    </aside>
  );
};

export default Sidebar;
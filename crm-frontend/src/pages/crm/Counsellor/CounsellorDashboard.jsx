import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

// Date helper
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const dt = new Date(dateStr);
  return dt.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

// Format currency with INR symbol and thousand separators
const formatCurrency = (num) =>
  num == null || isNaN(num) ? "-" : `₹${num.toLocaleString("en-IN")}`;

// Format phone number for display
const formatPhone = (phone) =>
  !phone ? "-" : phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

// Small badge for status with colors
const StatusBadge = ({ status }) => {
  const colors = {
    New: "#2563eb", // blue
    "In Progress": "#ca8a04", // amber
    Verified: "#16a34a", // green
    Escalated: "#dc2626", // red
    "Ready for Advisor": "#4b5563", // gray/dark
  };
  return (
    <span
      style={{
        backgroundColor: colors[status] || "#9ca3af",
        color: "#fff",
        borderRadius: 12,
        padding: "2px 8px",
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
        userSelect: "none",
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
};

const CounsellorDashboard = () => {
  const navigate = useNavigate();
  // User info and stats
  const [counsellorName, setCounsellorName] = useState("");
  const [assignedCases, setAssignedCases] = useState(0);
  const [activeCasesToday, setActiveCasesToday] = useState(0);
  const [callsPendingToday, setCallsPendingToday] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  // Top Lead Stats
  const [leadSummary, setLeadSummary] = useState({
    totalAssignedLeads: 0,
    activeConversations: 0,
    verifiedCustomers: 0,
    readyForAdvisor: 0,
    followUpsToday: 0,
    pendingDocs: 0,
    harassmentComplaints: 0,
  });

  // Leads list + filter state
  const [allLeads, setAllLeads] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
    debtType: "All",
    followupDue: "Any",
    dateRange: { from: "", to: "" },
  });
  const [filteredLeads, setFilteredLeads] = useState([]);

  // Selected lead for profile view
  const [selectedLead, setSelectedLead] = useState(null);

  // Loading & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Communication center modal open state (simplified)
  const [commModalOpen, setCommModalOpen] = useState(false);

  // Document upload tracking modal (simplified)
  const [docTrackerOpen, setDocTrackerOpen] = useState(false);

  // Eligibility calculation modal (simplified)
  const [eligibilityOpen, setEligibilityOpen] = useState(false);

  // Harassment tracker modal (simplified)
  const [harassmentOpen, setHarassmentOpen] = useState(false);

  // Notes/task modal (simplified)
  const [notesTaskOpen, setNotesTaskOpen] = useState(false);

  // Knowledge center toggle (optional)
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  // Fetch initial data on mount
  useEffect(() => {
    const userData = localStorage.getItem("counsellor");
    if (!userData) {
      setError("No active session found. Please log in.");
      setLoading(false);
      return;
    }
    const user = JSON.parse(userData);
    setCounsellorName(user.name || "Counsellor");

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, leadsRes, notificationsRes] = await Promise.all([
          axios.get(`/api/counsellor/${user.id}/stats`),
          axios.get(`/api/counsellor/${user.id}/leads`),
          axios.get(`/api/counsellor/${user.id}/notifications/count`),
        ]);
        const stats = statsRes.data;
        setAssignedCases(stats.assignedCases);
        setActiveCasesToday(stats.activeCasesToday);
        setCallsPendingToday(stats.callsPendingToday);
        setLeadSummary({
          totalAssignedLeads: stats.totalAssignedLeads,
          activeConversations: stats.activeConversations,
          verifiedCustomers: stats.verifiedCustomers,
          readyForAdvisor: stats.readyForAdvisor,
          followUpsToday: stats.followUpsToday,
          pendingDocs: stats.pendingDocumentation,
          harassmentComplaints: stats.harassmentComplaints,
        });
        setAllLeads(leadsRes.data);
        setNotificationsCount(notificationsRes.data.count);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Filter leads whenever filters or allLeads change
  useEffect(() => {
    let filtered = [...allLeads];

    if (filters.status && filters.status !== "All")
      filtered = filtered.filter((lead) => lead.status === filters.status);

    if (filters.debtType && filters.debtType !== "All")
      filtered = filtered.filter((lead) => lead.debtType === filters.debtType);

    if (filters.followupDue !== "Any") {
      const today = new Date();
      if (filters.followupDue === "Overdue") {
        filtered = filtered.filter(
          (lead) =>
            lead.followUpDate && new Date(lead.followUpDate) < today
        );
      } else if (filters.followupDue === "Today") {
        filtered = filtered.filter((lead) => {
          if (!lead.followUpDate) return false;
          const followUp = new Date(lead.followUpDate);
          return (
            followUp.getDate() === today.getDate() &&
            followUp.getMonth() === today.getMonth() &&
            followUp.getFullYear() === today.getFullYear()
          );
        });
      } else if (filters.followupDue === "Future") {
        filtered = filtered.filter(
          (lead) =>
            lead.followUpDate && new Date(lead.followUpDate) > today
        );
      }
    }

    if (filters.dateRange.from)
      filtered = filtered.filter(
        (lead) =>
          lead.assignedDate &&
          new Date(lead.assignedDate) >= new Date(filters.dateRange.from)
      );

    if (filters.dateRange.to)
      filtered = filtered.filter(
        (lead) =>
          lead.assignedDate &&
          new Date(lead.assignedDate) <= new Date(filters.dateRange.to)
      );

    setFilteredLeads(filtered);
  }, [allLeads, filters]);

  // Handle action buttons from table
  const onMarkReady = async (leadId) => {
    try {
      await axios.post(`/api/leads/${leadId}/mark-ready`);
      // Refetch leads after status update
      const res = await axios.get(`/api/counsellor/${leadId}/leads`);
      setAllLeads(res.data);
    } catch {
      alert("Failed to mark lead ready.");
    }
  };

  const onEscalate = async (leadId) => {
    try {
      await axios.post(`/api/leads/${leadId}/escalate`);
      const res = await axios.get(`/api/counsellor/${leadId}/leads`);
      setAllLeads(res.data);
    } catch {
      alert("Failed to escalate lead.");
    }
  };

  // --- Render section ---

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        color: "#223759",
        userSelect: "none",
      }}
    >
      {/* Sidebar fixed left */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 200,
          backgroundColor: "#fff",
          borderRight: "1px solid #d1d9f0",
          boxShadow: "2px 0 12px rgba(209, 217, 243, 0.6)",
          paddingTop: 24,
          paddingBottom: 24,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontWeight: "900",
            fontSize: 20,
            color: "#0070f3",
            marginBottom: 30,
            userSelect: "text",
          }}
          aria-label="Penny Debt Counsellor Dashboard"
        >
          Penny Debt
        </div>
        <Sidebar collapsed={false} />
        <button
          onClick={() => {
            localStorage.removeItem("counsellor");
            navigate("/counsellor-login");
          }}
          style={{
            marginTop: "auto",
            width: "90%",
            border: "none",
            borderRadius: 10,
            backgroundColor: "#dc2626",
            color: "#fff",
            fontWeight: 700,
            padding: "10px 0",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220,38,38,0.8)",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
          aria-label="Logout"
          type="button"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: 200,
          padding: 20,
          minHeight: "100vh",
          overflowY: "auto",
          flexGrow: 1,
          userSelect: "text",
        }}
        aria-label="Counsellor main dashboard content"
      >
        {/* Header */}
        <header
          style={{
            marginBottom: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <h1
            style={{ fontSize: 20, fontWeight: 700, margin: 0, userSelect: "text" }}
            aria-label="Counsellor Name"
          >
            Welcome, {counsellorName}
          </h1>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("counsellor");
              navigate("/counsellor-login");
            }}
            style={{
              backgroundColor: "#dc2626",
              border: "none",
              color: "#fff",
              fontWeight: 700,
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
              userSelect: "none",
              fontSize: 13,
              boxShadow: "0 2px 8px rgba(220,38,38,0.8)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            aria-label="Logout"
          >
            Logout
          </button>
        </header>

        {loading && <p>Loading dashboard data...</p>}
        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, marginBottom: 12 }}>
            {error}
          </p>
        )}

        {/* Top stats summary cards */}
        {!loading && !error && (
          <section
            aria-label="Lead Summary Cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              {
                label: "Total Assigned Leads",
                value: leadSummary.totalAssignedLeads,
              },
              {
                label: "Active Conversations",
                value: leadSummary.activeConversations,
              },
              {
                label: "Verified Customers",
                value: leadSummary.verifiedCustomers,
              },
              {
                label: "Cases Ready for Advisor",
                value: leadSummary.readyForAdvisor,
              },
              {
                label: "Follow-ups Today",
                value: leadSummary.followUpsToday,
              },
              {
                label: "Pending Documentation",
                value: leadSummary.pendingDocs,
              },
              {
                label: "Harassment Complaints",
                value: leadSummary.harassmentComplaints,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  backgroundColor: "#fff",
                  padding: 12,
                  borderRadius: 10,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  userSelect: "text",
                }}
                aria-label={`${label}: ${value}`}
              >
                <p
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    margin: 0,
                    color: accentColor,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    margin: "4px 0 0",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Filters for lead management list */}
        {!loading && !error && (
          <section aria-label="Lead filters" style={{ marginBottom: 12 }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                userSelect: "text",
              }}
            >
              {/* Status filter */}
              <label style={{ fontSize: 13, fontWeight: "600" }}>
                Status:
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  style={{ marginLeft: 4, fontSize: 13, padding: "2px 6px" }}
                >
                  {["All", "New", "Verified", "Ready for Advisor", "In Progress", "Escalated"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
              </label>

              {/* Debt type filter */}
              <label style={{ fontSize: 13, fontWeight: "600" }}>
                Debt Type:
                <select
                  value={filters.debtType}
                  onChange={(e) => setFilters({ ...filters, debtType: e.target.value })}
                  style={{ marginLeft: 4, fontSize: 13, padding: "2px 6px" }}
                >
                  {["All", "Personal Loan", "Credit Card", "Home Loan", "Car Loan"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              {/* Follow-up due filter */}
              <label style={{ fontSize: 13, fontWeight: "600" }}>
                Follow-up Due:
                <select
                  value={filters.followupDue}
                  onChange={(e) => setFilters({ ...filters, followupDue: e.target.value })}
                  style={{ marginLeft: 4, fontSize: 13, padding: "2px 6px" }}
                >
                  {["Any", "Overdue", "Today", "Future"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>

              {/* Assigned Date Range */}
              <label style={{ fontSize: 13, fontWeight: "600" }}>
                Assigned From:
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, from: e.target.value },
                    })
                  }
                  style={{ marginLeft: 4, fontSize: 13, padding: "2px 6px", maxWidth: 130 }}
                />
              </label>
              <label style={{ fontSize: 13, fontWeight: "600" }}>
                Assigned To:
                <input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      dateRange: { ...filters.dateRange, to: e.target.value },
                    })
                  }
                  style={{ marginLeft: 4, fontSize: 13, padding: "2px 6px", maxWidth: 130 }}
                />
              </label>
            </form>
          </section>
        )}

        {/* Lead Management Table */}
        {!loading && !error && (
          <section aria-label="Lead management table" style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
                userSelect: "text",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#eff6ff", userSelect: "none" }}>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Customer Name
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Contact
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Status
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Follow-up Date
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Income
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Total Debt
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Lead Age (days)
                  </th>
                  <th style={{ padding: "8px", fontWeight: 700, border: "1px solid #d1d9f0" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      style={{
                        padding: "12px",
                        textAlign: "center",
                        color: "#6b7280",
                      }}
                    >
                      No leads found for selected filters.
                    </td>
                  </tr>
                )}
                {filteredLeads.map((lead) => {
                  const assignedDate = lead.assignedDate ? new Date(lead.assignedDate) : null;
                  const leadAge = assignedDate
                    ? Math.floor((Date.now() - assignedDate.getTime()) / (1000 * 3600 * 24))
                    : "-";

                  return (
                    <tr key={lead._id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          style={{
                            background: "none",
                            border: "none",
                            color: accentColor,
                            textDecoration: "underline",
                            cursor: "pointer",
                            padding: 0,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                          aria-label={`View profile for ${lead.customerName}`}
                          type="button"
                        >
                          {lead.customerName || "-"}
                        </button>
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        {formatPhone(lead.contactNumber)}
                        <button
                          style={{
                            marginLeft: 8,
                            cursor: "pointer",
                            background: "#25d366",
                            borderRadius: 3,
                            border: "none",
                            padding: "3px 6px",
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: 11,
                          }}
                          title={`Call/WhatsApp ${lead.contactNumber}`}
                          onClick={() => alert("Open WhatsApp/Call modal - feature out of scope")}
                          type="button"
                        >
                          🟢
                        </button>
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        <StatusBadge status={lead.status} />
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        {formatDate(lead.followUpDate)}
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        {formatCurrency(lead.income)}
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        {formatCurrency(lead.totalDebt)}
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #d1d9f0" }}>
                        {leadAge}
                      </td>
                      <td
                        style={{
                          padding: "6px 8px",
                          border: "1px solid #d1d9f0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            marginRight: 6,
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 7px",
                          }}
                          onClick={() => setSelectedLead(lead)}
                          aria-label={`View lead ${lead.customerName}`}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          style={{
                            marginRight: 6,
                            backgroundColor: "#16a34a",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: lead.status === "Ready for Advisor" ? "not-allowed" : "pointer",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 7px",
                            opacity: lead.status === "Ready for Advisor" ? 0.6 : 1,
                          }}
                          disabled={lead.status === "Ready for Advisor"}
                          onClick={() => onMarkReady(lead._id)}
                          aria-label={`Mark lead ${lead.customerName} as Ready for Advisor`}
                        >
                          Ready
                        </button>
                        <button
                          type="button"
                          style={{
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "4px 7px",
                          }}
                          onClick={() => onEscalate(lead._id)}
                          aria-label={`Escalate lead ${lead.customerName}`}
                        >
                          Escalate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {/* Customer Profile View modal */}
        {selectedLead && (
          <LeadProfileModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
          />
        )}
      </main>
    </div>
  );
};

// Lead Profile Modal component
const LeadProfileModal = ({ lead, onClose }) => {
  // Local states for tabs or sections (KYC, Income, Debt, Docs, Notes)
  const [activeTab, setActiveTab] = useState("kyc");

  // Debt-to-Income Ratio Calculator logic
  const debtToIncomeRatio = useMemo(() => {
    const netIncome = lead.income || 0;
    const monthlyEMI = lead.monthlyEMI || 0;
    if (netIncome === 0) return null;
    return (monthlyEMI / netIncome) * 100;
  }, [lead.income, lead.monthlyEMI]);

  // Risk classification
  const riskStatus = useMemo(() => {
    if (debtToIncomeRatio == null) return "N/A";
    if (debtToIncomeRatio < 30) return "Low Risk";
    if (debtToIncomeRatio <= 50) return "Moderate Risk (Eligible)";
    return "High Risk (Needs Restructuring)";
  }, [debtToIncomeRatio]);

  // Allow marking ready (simulate)
  const markReadyForAdvisor = () => {
    alert(`Marked ${lead.customerName} as Ready for Advisor (simulate)`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-profile-title"
      tabIndex={-1}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 40,
        overflowY: "auto",
        userSelect: "text",
      }}
      onClick={onClose}
    >
      <div
        role="document"
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          width: "90%",
          maxWidth: 900,
          padding: 20,
          boxShadow: "0 4px 25px rgba(0,0,0,0.15)",
          userSelect: "text",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 id="lead-profile-title" style={{ fontSize: 20, margin: 0 }}>
            Lead Profile - {lead.customerName || "-"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Lead Profile"
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              userSelect: "none",
              color: "#444",
              fontWeight: "900",
            }}
          >
            &times;
          </button>
        </header>

        {/* Tabs */}
        <nav
          aria-label="Lead profile sections"
          style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
        >
          {[
            { id: "kyc", label: "KYC & Personal Details" },
            { id: "income", label: "Income & Expenses" },
            { id: "debt", label: "Debt List & EMIs" },
            { id: "documents", label: "Documents" },
            { id: "notes", label: "Notes & Call Logs" },
            { id: "eligibility", label: "Eligibility Calculator" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                border: activeTab === tab.id ? `2px solid ${accentColor}` : "1px solid #d1d9f0",
                backgroundColor: activeTab === tab.id ? "#eff6ff" : "#fafafa",
                padding: "6px 14px",
                borderRadius: 8,
                fontWeight: activeTab === tab.id ? 700 : 600,
                fontSize: 13,
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
              aria-current={activeTab === tab.id ? "true" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <section aria-live="polite" aria-atomic="true" style={{ fontSize: 13, lineHeight: 1.4 }}>
          {activeTab === "kyc" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                KYC & Personal Details
              </h3>
              <p>
                <strong>Full Name:</strong> {lead.customerName || "-"}
              </p>
              <p>
                <strong>Date of Birth:</strong> {lead.dob || "-"}
              </p>
              <p>
                <strong>Aadhaar Number:</strong> {lead.aadhaar || "-"}
              </p>
              <p>
                <strong>PAN Number:</strong> {lead.pan || "-"}
              </p>
              <p>
                <strong>Contact:</strong> {lead.contactNumber || "-"}
              </p>
              <p>
                <strong>Address:</strong> {lead.address || "-"}
              </p>
            </div>
          )}

          {activeTab === "income" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                Income & Expense Sheet
              </h3>
              <p>
                <strong>Net Monthly Income:</strong> {formatCurrency(lead.income)}
              </p>
              <p>
                <strong>Monthly Expenses:</strong> {formatCurrency(lead.monthlyExpenses || 0)}
              </p>
              <p>
                <strong>Other Income:</strong> {formatCurrency(lead.otherIncome || 0)}
              </p>
            </div>
          )}

          {activeTab === "debt" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                Debt List & EMI Details
              </h3>
              {lead.debts && lead.debts.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Lender</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Type</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                        EMI/Month
                      </th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                        Outstanding
                      </th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                        Tenure Left
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lead.debts.map((debt, i) => (
                      <tr key={i}>
                        <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                          {debt.lender}
                        </td>
                        <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                          {debt.type}
                        </td>
                        <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                          {formatCurrency(debt.emi)}
                        </td>
                        <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                          {formatCurrency(debt.outstanding)}
                        </td>
                        <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                          {debt.tenureLeft || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No debts listed.</p>
              )}
            </div>
          )}

          {activeTab === "documents" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                Uploaded Documents & Verification
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["PAN Card", "Aadhaar", "Bank Statement", "Loan Documents", "Salary Slips"].map(
                  (doc) => {
                    const status = lead.documents?.[doc]?.status || "Pending";
                    const colorMap = {
                      Pending: "#b91c1c",
                      Uploaded: "#ca8a04",
                      Verified: "#16a34a",
                    };
                    return (
                      <li
                        key={doc}
                        style={{
                          marginBottom: 6,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{doc}</span>
                        <span
                          style={{
                            backgroundColor: colorMap[status] || "#6b7280",
                            color: "#fff",
                            borderRadius: 12,
                            padding: "2px 8px",
                            fontSize: 11,
                            fontWeight: 600,
                            minWidth: 70,
                            textAlign: "center",
                          }}
                        >
                          {status}
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                Notes & Call Logs
              </h3>
              {lead.notes && lead.notes.length > 0 ? (
                <ul style={{ listStyle: "none", paddingLeft: 0, maxHeight: 300, overflowY: "auto" }}>
                  {lead.notes.map((note, index) => (
                    <li
                      key={index}
                      style={{
                        borderBottom: "1px solid #e5e7eb",
                        paddingBottom: 8,
                        marginBottom: 8,
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 12 }}>
                        {note.author} <span style={{ fontWeight: 400, fontSize: 10 }}>({new Date(note.date).toLocaleString()})</span>
                      </p>
                      <p style={{ margin: "4px 0 0", fontSize: 12 }}>{note.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notes available.</p>
              )}
            </div>
          )}

          {activeTab === "eligibility" && (
            <div>
              <h3 style={{ marginBottom: 8, fontWeight: 700, color: accentColor }}>
                Eligibility Calculator
              </h3>
              <p>
                <strong>Debt-to-Income Ratio:</strong>{" "}
                {debtToIncomeRatio == null ? "-" : `${debtToIncomeRatio.toFixed(2)}%`}
              </p>
              <p>
                <strong>Status:</strong> {riskStatus}
              </p>
              <button
                type="button"
                style={{
                  backgroundColor: "#16a34a",
                  border: "none",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  marginTop: 12,
                }}
                onClick={markReadyForAdvisor}
                disabled={riskStatus === "High Risk (Needs Restructuring)" || riskStatus === "N/A"}
                aria-disabled={riskStatus === "High Risk (Needs Restructuring)"}
                aria-label="Mark lead as Ready for Advisor"
              >
                Mark Ready for Advisor
              </button>
              {(riskStatus === "High Risk (Needs Restructuring)" || riskStatus === "N/A") && (
                <p style={{ marginTop: 8, fontSize: 12, color: "#dc2626" }}>
                  Lead not eligible to mark ready due to high risk.
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CounsellorDashboard;
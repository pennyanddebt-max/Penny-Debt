import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const LegalDashboard = () => {
  const navigate = useNavigate();
  const [legalData, setLegalData] = useState(null);
  const [recentCases, setRecentCases] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("legalUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchLegalData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, casesRes, approvalsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/legal/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/legal/${user.id}/recent-cases`),
          axios.get(`http://localhost:5000/api/legal/${user.id}/pending-approvals`),
        ]);
        setLegalData(metricsRes.data);
        setRecentCases(casesRes.data);
        setPendingApprovals(approvalsRes.data);
        setError(null);
      } catch {
        setError("Failed to load legal dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLegalData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("legalUser");
    navigate("/legal-login");
  };

  const sectionHeadingStyle = {
    color: accentColor,
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 8,
    userSelect: "none",
  };

  const paragraphStyle = {
    fontSize: 13,
    margin: "4px 0",
    color: primaryColor,
    lineHeight: 1.4,
    userSelect: "text",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(209, 217, 243, 0.6)",
    padding: 20,
    marginBottom: 20,
    color: primaryColor,
    fontSize: 13,
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const dt = new Date(dateStr);
    return dt.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily,
        color: primaryColor,
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        userSelect: "none",
      }}
      aria-label="Legal Dashboard"
    >
      {/* Sidebar fixed on the left */}
      <aside
        style={{
          position: "fixed",
          width: 200,
          top: 0,
          left: 0,
          bottom: 0,
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
            fontSize: 20,
            fontWeight: "900",
            color: accentColor,
            marginBottom: 30,
            userSelect: "text",
            letterSpacing: "1.2px",
            textAlign: "center",
          }}
          aria-label="Penny Debt Legal Dashboard"
        >
          Penny Debt
        </div>
        <Sidebar collapsed={false} />
        <button
          onClick={handleLogout}
          aria-label="Logout"
          style={{
            marginTop: "auto",
            width: "90%",
            fontWeight: "700",
            fontSize: 13,
            backgroundColor: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220,38,38,0.8)",
            userSelect: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
          type="button"
        >
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <main
        style={{
          marginLeft: 200,
          padding: 24,
          width: "calc(100vw - 200px)",
          overflowY: "auto",
          userSelect: "text",
        }}
      >
        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
            userSelect: "text",
          }}
        >
          Welcome,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "800" }}>
            {legalData?.name || "Legal User"}
          </span>
        </h1>

        {isLoading && <p style={{ fontSize: 14 }}>Loading legal dashboard data...</p>}

        {error && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: "700" }}>{error}</p>
        )}

        {!isLoading && !error && legalData && (
          <>
            {/* Legal Metrics */}
            <section style={cardStyle} aria-labelledby="legal-metrics-heading">
              <h2 id="legal-metrics-heading" style={sectionHeadingStyle}>
                Legal Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Cases:</strong> {legalData.totalCases ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Open Cases:</strong> {legalData.openCases ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Closed Cases:</strong> {legalData.closedCases ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Approvals:</strong> {legalData.pendingApprovals ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Open Legal Notices:</strong> {legalData.openLegalNotices ?? 0}
              </p>
            </section>

            {/* Recent Legal Cases */}
            <section style={cardStyle} aria-labelledby="recent-cases-heading">
              <h2 id="recent-cases-heading" style={sectionHeadingStyle}>
                Recent Legal Cases
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Case ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Customer</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Type</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Filing Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Next Hearing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCases && recentCases.length > 0 ? (
                      recentCases.map((c) => (
                        <tr key={c.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{c.caseId}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{c.customerName}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{c.type}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{c.status}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(c.filingDate)}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(c.nextHearing)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: 12, textAlign: "center", color: "#6b7280" }}
                        >
                          No recent legal cases found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pending Approvals */}
            <section style={cardStyle} aria-labelledby="pending-approvals-heading">
              <h2 id="pending-approvals-heading" style={sectionHeadingStyle}>
                Pending Approvals
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Approval ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Requestor</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Type</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals && pendingApprovals.length > 0 ? (
                      pendingApprovals.map((a) => (
                        <tr key={a.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{a.approvalId}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{a.requestor}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{a.type}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(a.date)}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{a.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ padding: 12, textAlign: "center", color: "#6b7280" }}
                        >
                          No pending approvals found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Actions */}
            <section style={cardStyle} aria-labelledby="quick-actions-heading">
              <h2 id="quick-actions-heading" style={sectionHeadingStyle}>
                Quick Actions
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  paddingLeft: 0,
                  margin: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {[
                  { href: "/dashboard/legal/cases/new", text: "Add New Case", label: "Add new case" },
                  { href: "/dashboard/legal/cases", text: "View Cases", label: "View all cases" },
                  { href: "/dashboard/legal/approvals", text: "Pending Approvals", label: "Manage approvals" },
                  { href: "/dashboard/legal/reports", text: "Reports & Analytics", label: "View reports" },
                ].map(({ href, text, label }) => (
                  <li key={href} style={{ flex: "1 1 160px" }}>
                    <a
                      href={href}
                      aria-label={label}
                      style={{
                        display: "block",
                        backgroundColor: accentColor,
                        color: "#fff",
                        padding: "10px 0",
                        fontWeight: "700",
                        borderRadius: 8,
                        textAlign: "center",
                        textDecoration: "none",
                        transition: "background-color 0.3s ease",
                        userSelect: "text",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005bb5")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LegalDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const RecoveryDashboard = () => {
  const navigate = useNavigate();
  const [recoveryData, setRecoveryData] = useState(null);
  const [overdueAccounts, setOverdueAccounts] = useState([]);
  const [pendingRecoveries, setPendingRecoveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("recoveryUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchRecoveryData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, overdueRes, pendingRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/recovery/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/recovery/${user.id}/overdue-accounts`),
          axios.get(`http://localhost:5000/api/recovery/${user.id}/pending-recoveries`),
        ]);
        setRecoveryData(metricsRes.data);
        setOverdueAccounts(overdueRes.data);
        setPendingRecoveries(pendingRes.data);
        setError(null);
      } catch {
        setError("Failed to load recovery dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecoveryData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("recoveryUser");
    navigate("/recovery-login");
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

  const formatCurrency = (num) =>
    num == null || isNaN(num) ? "-" : `₹${num.toLocaleString("en-IN")}`;

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
      aria-label="Recovery Dashboard"
    >
      {/* Sidebar on left */}
      <aside
        style={{
          position: "fixed",
          width: 200,
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "#fff",
          borderRight: "1px solid #d1d9f0",
          boxShadow: "2px 0 12px rgba(209,217,243,0.6)",
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
          aria-label="Penny Debt Recovery Dashboard"
        >
          Penny Debt
        </div>
        <Sidebar collapsed={false} />
        <button
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
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
            {recoveryData?.name || "Recovery User"}
          </span>
        </h1>

        {isLoading && <p>Loading recovery dashboard data...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && recoveryData && (
          <>
            {/* Recovery Metrics */}
            <section style={cardStyle} aria-labelledby="recovery-metrics-heading">
              <h2 id="recovery-metrics-heading" style={sectionHeadingStyle}>
                Recovery Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Accounts:</strong> {recoveryData.totalAccounts ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Overdue Accounts:</strong> {recoveryData.overdueAccounts ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Amount Recovered:</strong> {formatCurrency(recoveryData.amountRecovered)}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Recoveries:</strong> {recoveryData.pendingRecoveries ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Recovery Rate:</strong>{" "}
                {recoveryData.recoveryRate ? `${recoveryData.recoveryRate}%` : "-"}
              </p>
            </section>

            {/* Overdue Accounts */}
            <section style={cardStyle} aria-labelledby="overdue-accounts-heading">
              <h2 id="overdue-accounts-heading" style={sectionHeadingStyle}>
                Overdue Accounts
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
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Account ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Customer</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Outstanding Amount</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Due Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Days Overdue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overdueAccounts && overdueAccounts.length > 0 ? (
                      overdueAccounts.map((account) => (
                        <tr key={account.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{account.accountId}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{account.customerName}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {formatCurrency(account.outstandingAmount)}
                          </td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {formatDate(account.dueDate)}
                          </td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {account.daysOverdue ?? "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                          No overdue accounts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pending Recoveries */}
            <section style={cardStyle} aria-labelledby="pending-recoveries-heading">
              <h2 id="pending-recoveries-heading" style={sectionHeadingStyle}>
                Pending Recoveries
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
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Recovery ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Account</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Amount Pending</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Recovery Officer</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Expected Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRecoveries && pendingRecoveries.length > 0 ? (
                      pendingRecoveries.map((recovery) => (
                        <tr key={recovery.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{recovery.recoveryId}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{recovery.accountId}</td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {formatCurrency(recovery.amountPending)}
                          </td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {recovery.officerName || "-"}
                          </td>
                          <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                            {formatDate(recovery.expectedDate)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                          No pending recoveries found.
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
                  { href: "/dashboard/recovery/new-case", text: "Add Recovery Case", label: "Add a recovery case" },
                  { href: "/dashboard/recovery/overdue", text: "View Overdue Accounts", label: "View overdue accounts" },
                  { href: "/dashboard/recovery/pending", text: "View Pending Recoveries", label: "View pending recoveries" },
                  { href: "/dashboard/recovery/reports", text: "Reports & Analytics", label: "View recovery analytics" },
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

export default RecoveryDashboard;
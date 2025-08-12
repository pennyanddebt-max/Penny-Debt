import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const [financeMetrics, setFinanceMetrics] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("financeOfficer");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchFinanceData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, transactionsRes, approvalsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/finance/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/finance/${user.id}/recent-transactions`),
          axios.get(`http://localhost:5000/api/finance/${user.id}/pending-approvals`),
        ]);
        setFinanceMetrics(metricsRes.data);
        setRecentTransactions(transactionsRes.data);
        setPendingApprovals(approvalsRes.data);
        setError(null);
      } catch {
        setError("Failed to load finance dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("financeOfficer");
    navigate("/finance-login");
  };

  // Styling
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
    return dt.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
      aria-label="Finance Officer Dashboard"
    >
      {/* Sidebar fixed on left */}
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
          aria-label="Penny Debt Finance Officer Dashboard"
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
            {financeMetrics?.name || "Finance Officer"}
          </span>
        </h1>

        {isLoading && <p style={{ fontSize: 14 }}>Loading finance dashboard data...</p>}

        {error && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: "700" }}>{error}</p>
        )}

        {!isLoading && !error && financeMetrics && (
          <>
            {/* KPIs Overview */}
            <section style={cardStyle} aria-labelledby="metrics-heading">
              <h2 id="metrics-heading" style={sectionHeadingStyle}>
                Finance Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Revenue:</strong> {formatCurrency(financeMetrics.totalRevenue)}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Payments:</strong>{" "}
                {formatCurrency(financeMetrics.pendingPayments)}
              </p>
              <p style={paragraphStyle}>
                <strong>Completed Payments:</strong>{" "}
                {formatCurrency(financeMetrics.completedPayments)}
              </p>
              <p style={paragraphStyle}>
                <strong>Outstanding Loans:</strong>{" "}
                {formatCurrency(financeMetrics.outstandingLoans)}
              </p>
              <p style={paragraphStyle}>
                <strong>Monthly Expenses:</strong>{" "}
                {formatCurrency(financeMetrics.monthlyExpenses)}
              </p>
            </section>

            {/* Recent Transactions */}
            <section style={cardStyle} aria-labelledby="transactions-heading">
              <h2 id="transactions-heading" style={sectionHeadingStyle}>
                Recent Transactions
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Transaction ID</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Customer</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Amount</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Date</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.length > 0 ? (
                      recentTransactions.map((txn) => (
                        <tr key={txn.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{txn.transactionId}</td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{txn.customerName}</td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatCurrency(txn.amount)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatDate(txn.date)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{txn.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ padding: 12, textAlign: "center", color: "#6b7280" }}
                        >
                          No recent transactions found.
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
                    fontSize: 12,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Approval ID</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Requestor</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Amount</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Date</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Request Type</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.length > 0 ? (
                      pendingApprovals.map((app) => (
                        <tr key={app.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{app.approvalId}</td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{app.requestor}</td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatCurrency(app.amount)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatDate(app.date)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{app.requestType}</td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>{app.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
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
                  {
                    href: "/dashboard/finance/new-invoice",
                    text: "Create New Invoice",
                    label: "Create new invoice",
                  },
                  {
                    href: "/dashboard/finance/payments",
                    text: "View Payments",
                    label: "View all payments",
                  },
                  {
                    href: "/dashboard/finance/approvals",
                    text: "Manage Approvals",
                    label: "Manage pending approvals",
                  },
                  {
                    href: "/dashboard/finance/reports",
                    text: "Reports & Analytics",
                    label: "View finance analytics",
                  },
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

export default FinanceDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const CreditDashboard = () => {
  const navigate = useNavigate();
  const [creditData, setCreditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("creditOfficer");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchCreditData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/credit-officer/${user.id}/dashboard`
        );
        setCreditData(res.data);
        setError(null);
      } catch {
        setError("Failed to load credit dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreditData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("creditOfficer");
    navigate("/credit-login");
  };

  // Style constants
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
      aria-label="Credit Officer Dashboard"
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
          aria-label="Penny Debt Credit Officer Dashboard"
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
            {creditData?.name || "Credit Officer"}
          </span>
        </h1>

        {isLoading && <p style={{ fontSize: 14 }}>Loading credit dashboard data...</p>}

        {error && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: "700" }}>
            {error}
          </p>
        )}

        {!isLoading && !error && creditData && (
          <>
            {/* Credit Summary section */}
            <section style={cardStyle} aria-labelledby="credit-summary-heading">
              <h2 id="credit-summary-heading" style={sectionHeadingStyle}>
                Credit Summary
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Credit Applications:</strong> {creditData.totalApplications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Approved Applications:</strong> {creditData.approvedApplications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Rejected Applications:</strong> {creditData.rejectedApplications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Applications:</strong> {creditData.pendingApplications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Average Credit Score:</strong> {creditData.averageCreditScore ?? "-"}
              </p>
              <p style={paragraphStyle}>
                <strong>Outstanding Loans:</strong> {formatCurrency(creditData.outstandingLoans)}
              </p>
            </section>

            {/* Recent Credit Cases */}
            <section style={cardStyle} aria-labelledby="recent-cases-heading">
              <h2 id="recent-cases-heading" style={sectionHeadingStyle}>
                Recent Credit Cases
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
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Applicant</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Loan Type</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Credit Score</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Loan Amount</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Application Date</th>
                      <th style={{ padding: 6, border: "1px solid #d1d9f0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditData.recentCases && creditData.recentCases.length > 0 ? (
                      creditData.recentCases.map((caseItem) => (
                        <tr key={caseItem._id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {caseItem.applicantName}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {caseItem.loanType}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {caseItem.creditScore ?? "-"}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatCurrency(caseItem.loanAmount)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {formatDate(caseItem.applicationDate)}
                          </td>
                          <td style={{ padding: 6, border: "1px solid #d1d9f0" }}>
                            {caseItem.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: 12, textAlign: "center", color: "#6b7280" }}
                        >
                          No recent credit cases found.
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
                    href: "/dashboard/credit/applications/new",
                    text: "Create New Application",
                    label: "Create new credit application",
                  },
                  {
                    href: "/dashboard/credit/applications",
                    text: "View All Applications",
                    label: "View all credit applications",
                  },
                  {
                    href: "/dashboard/credit/credit-check",
                    text: "Perform Credit Check",
                    label: "Perform credit check",
                  },
                  {
                    href: "/dashboard/credit/reports",
                    text: "Reports & Analytics",
                    label: "View credit analytics",
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

export default CreditDashboard;
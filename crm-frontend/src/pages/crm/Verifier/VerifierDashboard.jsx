import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const VerifierDashboard = () => {
  const navigate = useNavigate();
  const [verifierData, setVerifierData] = useState(null);
  const [verificationTasks, setVerificationTasks] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("verifierUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchVerifierData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, tasksRes, approvalsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/verifier/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/verifier/${user.id}/verification-tasks`),
          axios.get(`http://localhost:5000/api/verifier/${user.id}/pending-approvals`),
        ]);
        setVerifierData(metricsRes.data);
        setVerificationTasks(tasksRes.data);
        setPendingApprovals(approvalsRes.data);
        setError(null);
      } catch {
        setError("Failed to load verifier dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerifierData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("verifierUser");
    navigate("/verifier-login");
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
      aria-label="Verifier Dashboard"
    >
      {/* Sidebar fixed left */}
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
          aria-label="Penny Debt Verifier Dashboard"
        >
          Penny Debt
        </div>
        <Sidebar collapsed={false} />
        <button
          onClick={handleLogout}
          type="button"
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
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
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
            {verifierData?.name || "Verifier"}
          </span>
        </h1>

        {isLoading && <p>Loading verifier dashboard data...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && verifierData && (
          <>
            {/* Verifier Metrics */}
            <section style={cardStyle} aria-labelledby="verifier-metrics-heading">
              <h2 id="verifier-metrics-heading" style={sectionHeadingStyle}>
                Verifier Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Verifications:</strong> {verifierData.totalVerifications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Tasks:</strong> {verifierData.pendingTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Approvals Pending:</strong> {verifierData.approvalsPending ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Average Verification Time:</strong>{" "}
                {verifierData.averageVerificationTime ? `${verifierData.averageVerificationTime} hrs` : "-"}
              </p>
            </section>

            {/* Verification Tasks */}
            <section style={cardStyle} aria-labelledby="verification-tasks-heading">
              <h2 id="verification-tasks-heading" style={sectionHeadingStyle}>
                Verification Tasks
              </h2>
              {verificationTasks.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                    userSelect: "text",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Task ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Loan ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationTasks.map((task) => (
                      <tr key={task.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.taskId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.loanId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.status}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(task.dueDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No verification tasks found.</p>
              )}
            </section>

            {/* Pending Approvals */}
            <section style={cardStyle} aria-labelledby="pending-approvals-heading">
              <h2 id="pending-approvals-heading" style={sectionHeadingStyle}>
                Pending Approvals
              </h2>
              {pendingApprovals.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                    userSelect: "text",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Approval ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Loan ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Requester</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date Requested</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.map((approval) => (
                      <tr key={approval.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.approvalId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.loanId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.requester}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(approval.dateRequested)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No pending approvals found.</p>
              )}
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
                  { href: "/dashboard/verifier/verification-tasks", text: "Manage Verification Tasks", label: "Manage verification tasks" },
                  { href: "/dashboard/verifier/approvals", text: "Approve Requests", label: "Approve pending requests" },
                  { href: "/dashboard/verifier/reports", text: "Reports & Analytics", label: "View verifier reports" },
                  { href: "/dashboard/verifier/settings", text: "Settings", label: "Verifier settings" },
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

export default VerifierDashboard;
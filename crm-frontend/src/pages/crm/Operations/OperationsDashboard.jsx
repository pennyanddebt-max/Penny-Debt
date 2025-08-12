import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const OperationsDashboard = () => {
  const navigate = useNavigate();
  const [operationsData, setOperationsData] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("operationsUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchOperationsData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, tasksRes, approvalsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/operations/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/operations/${user.id}/recent-tasks`),
          axios.get(`http://localhost:5000/api/operations/${user.id}/pending-approvals`),
        ]);
        setOperationsData(metricsRes.data);
        setRecentTasks(tasksRes.data);
        setPendingApprovals(approvalsRes.data);
        setError(null);
      } catch {
        setError("Failed to load operations dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOperationsData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("operationsUser");
    navigate("/operations-login");
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
      aria-label="Operations Dashboard"
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
          aria-label="Penny Debt Operations Dashboard"
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
            {operationsData?.name || "Operations User"}
          </span>
        </h1>

        {isLoading && <p>Loading operations dashboard data...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && operationsData && (
          <>
            {/* Operations Metrics */}
            <section style={cardStyle} aria-labelledby="operations-metrics-heading">
              <h2 id="operations-metrics-heading" style={sectionHeadingStyle}>
                Operations Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Tasks:</strong> {operationsData.totalTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Completed Tasks:</strong> {operationsData.completedTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Tasks:</strong> {operationsData.pendingTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Approvals:</strong> {operationsData.pendingApprovals ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Average Task Completion Time:</strong>{" "}
                {operationsData.averageCompletionTime
                  ? `${operationsData.averageCompletionTime} hrs`
                  : "-"}
              </p>
            </section>

            {/* Recent Tasks */}
            <section style={cardStyle} aria-labelledby="recent-tasks-heading">
              <h2 id="recent-tasks-heading" style={sectionHeadingStyle}>
                Recent Tasks
              </h2>
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
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Task Name</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Assigned To</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTasks.length > 0 ? (
                    recentTasks.map((task) => (
                      <tr key={task.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.taskId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.taskName}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.assignedTo}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.status}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                        No recent tasks found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            {/* Pending Approvals */}
            <section style={cardStyle} aria-labelledby="pending-approvals-heading">
              <h2 id="pending-approvals-heading" style={sectionHeadingStyle}>
                Pending Approvals
              </h2>
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
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Requestor</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Type</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.length > 0 ? (
                    pendingApprovals.map((approval) => (
                      <tr key={approval.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.approvalId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.requestor}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.type}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {approval.date ? new Date(approval.date).toLocaleDateString() : "-"}
                        </td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{approval.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                        No pending approvals found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                  { href: "/dashboard/operations/new-task", text: "Create New Task", label: "Create new task" },
                  { href: "/dashboard/operations/tasks", text: "View Tasks", label: "View all tasks" },
                  { href: "/dashboard/operations/approvals", text: "Manage Approvals", label: "Manage approvals" },
                  { href: "/dashboard/operations/reports", text: "Reports & Analytics", label: "View reports" },
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

export default OperationsDashboard;
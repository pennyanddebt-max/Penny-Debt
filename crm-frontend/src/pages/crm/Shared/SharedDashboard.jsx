import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const SharedDashboard = () => {
  const navigate = useNavigate();
  const [sharedData, setSharedData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("sharedUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchSharedData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, notificationsRes, tasksRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/shared/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/shared/${user.id}/notifications`),
          axios.get(`http://localhost:5000/api/shared/${user.id}/tasks`),
        ]);
        setSharedData(metricsRes.data);
        setNotifications(notificationsRes.data);
        setTasks(tasksRes.data);
        setError(null);
      } catch {
        setError("Failed to load shared dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sharedUser");
    navigate("/shared-login");
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

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    const dt = new Date(dateStr);
    return dt.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
      aria-label="Shared Dashboard"
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
          aria-label="Penny Debt Shared Dashboard"
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
            {sharedData?.name || "User"}
          </span>
        </h1>

        {isLoading && <p>Loading shared dashboard data...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && sharedData && (
          <>
            {/* Dashboard Metrics */}
            <section style={cardStyle} aria-labelledby="shared-metrics-heading">
              <h2 id="shared-metrics-heading" style={sectionHeadingStyle}>
                Overview
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Notifications:</strong> {sharedData.totalNotifications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Unread Notifications:</strong> {sharedData.unreadNotifications ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Open Tasks:</strong> {sharedData.openTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Completed Tasks:</strong> {sharedData.completedTasks ?? 0}
              </p>
            </section>

            {/* Notifications */}
            <section style={cardStyle} aria-labelledby="notifications-heading">
              <h2 id="notifications-heading" style={sectionHeadingStyle}>
                Notifications
              </h2>
              {notifications.length > 0 ? (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    maxHeight: 300,
                    overflowY: "auto",
                    userSelect: "text",
                  }}
                  aria-live="polite"
                >
                  {notifications.map((note) => (
                    <li
                      key={note.id}
                      style={{
                        borderBottom: "1px solid #d1d9f0",
                        padding: "8px 0",
                        backgroundColor: note.read ? "transparent" : "#e0f0ff",
                      }}
                      aria-label={`Notification: ${note.title}`}
                    >
                      <p style={{ margin: "0 0 4px", fontWeight: note.read ? "400" : "700" }}>
                        {note.title}
                      </p>
                      <small style={{ color: "#555" }}>{formatDateTime(note.date)}</small>
                      <p style={{ margin: "4px 0 0", fontSize: 13 }}>{note.message}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications found.</p>
              )}
            </section>

            {/* Tasks */}
            <section style={cardStyle} aria-labelledby="tasks-heading">
              <h2 id="tasks-heading" style={sectionHeadingStyle}>
                Tasks
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
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Task</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Assigned To</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.title}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.assignedTo}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{task.status}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                        No tasks found.
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
                  {
                    href: "/dashboard/shared/notifications",
                    text: "View All Notifications",
                    label: "View all notifications",
                  },
                  {
                    href: "/dashboard/shared/tasks/new",
                    text: "Create New Task",
                    label: "Create a new shared task",
                  },
                  {
                    href: "/dashboard/shared/tasks",
                    text: "Manage Tasks",
                    label: "Manage tasks",
                  },
                  {
                    href: "/dashboard/shared/reports",
                    text: "Reports & Analytics",
                    label: "View shared reports",
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

export default SharedDashboard;
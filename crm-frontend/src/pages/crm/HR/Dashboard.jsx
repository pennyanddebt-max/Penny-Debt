import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const HRDashboard = () => {
  const navigate = useNavigate();
  const [hrData, setHRData] = useState(null);
  const [recentHires, setRecentHires] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("hrUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchHRData = async () => {
      try {
        setIsLoading(true);
        const [dataRes, hiresRes, requestsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/hr/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/hr/${user.id}/recent-hires`),
          axios.get(`http://localhost:5000/api/hr/${user.id}/pending-requests`),
        ]);
        setHRData(dataRes.data);
        setRecentHires(hiresRes.data);
        setPendingRequests(requestsRes.data);
        setError(null);
      } catch {
        setError("Failed to load HR dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHRData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hrUser");
    navigate("/hr-login");
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
      aria-label="HR Dashboard"
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
          aria-label="Penny Debt HR Dashboard"
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
            {hrData?.name || "HR User"}
          </span>
        </h1>

        {isLoading && <p style={{ fontSize: 14 }}>Loading HR dashboard data...</p>}

        {error && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: "700" }}>{error}</p>
        )}

        {!isLoading && !error && hrData && (
          <>
            {/* HR Metrics */}
            <section style={cardStyle} aria-labelledby="hr-metrics-heading">
              <h2 id="hr-metrics-heading" style={sectionHeadingStyle}>
                HR Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Employees:</strong> {hrData.totalEmployees ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Open Positions:</strong> {hrData.openPositions ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Leave Requests:</strong> {hrData.pendingLeaveRequests ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Upcoming Interviews:</strong> {hrData.upcomingInterviews ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Employee Turnover Rate:</strong>{" "}
                {hrData.turnoverRate ? `${hrData.turnoverRate}%` : "-"}
              </p>
            </section>

            {/* Recent Hires */}
            <section style={cardStyle} aria-labelledby="recent-hires-heading">
              <h2 id="recent-hires-heading" style={sectionHeadingStyle}>
                Recent Hires
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
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Name</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Position</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date Joined</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHires.length > 0 ? (
                    recentHires.map((hire) => (
                      <tr key={hire.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{hire.name}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{hire.position}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {formatDate(hire.dateJoined)}
                        </td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{hire.department}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                        No recent hires found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            {/* Pending Requests */}
            <section style={cardStyle} aria-labelledby="pending-requests-heading">
              <h2 id="pending-requests-heading" style={sectionHeadingStyle}>
                Pending Requests
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
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Request ID</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Employee</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Type</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date</th>
                    <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{req.requestId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{req.employeeName}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{req.type}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {formatDate(req.date)}
                        </td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{req.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: 12, textAlign: "center", color: "#6b7280" }}>
                        No pending requests found.
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
                    href: "/dashboard/hr/new-employee",
                    text: "Add New Employee",
                    label: "Add a new employee",
                  },
                  {
                    href: "/dashboard/hr/leave-requests",
                    text: "Manage Leave Requests",
                    label: "Manage leave requests",
                  },
                  {
                    href: "/dashboard/hr/interviews",
                    text: "Schedule Interviews",
                    label: "Schedule interviews",
                  },
                  {
                    href: "/dashboard/hr/reports",
                    text: "Reports & Analytics",
                    label: "View HR analytics",
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

export default HRDashboard;
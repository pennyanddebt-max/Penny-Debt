import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const CTODashboard = () => {
  const navigate = useNavigate();
  const [ctoDetails, setCTODetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("cto");
    if (!storedUser) {
      setError("No active CTO session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchCTODetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cto-auth/${user.cto_id}`
        );
        setCTODetails(res.data);
        setError(null);
      } catch {
        setError("Failed to load CTO details, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCTODetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cto");
    navigate("/cto-login");
  };

  // Styling for headings
  const sectionHeadingStyle = {
    color: accentColor,
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 8,
    userSelect: "none",
  };

  // Paragraph styling
  const paragraphStyle = {
    fontSize: 13,
    margin: "4px 0",
    color: primaryColor,
    lineHeight: 1.4,
    userSelect: "text",
  };

  // Card style for data containers
  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 10px rgba(209, 217, 243, 0.6)",
    padding: 20,
    marginBottom: 20,
    color: primaryColor,
    fontSize: 13,
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
      aria-label="CTO Dashboard"
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
          userSelect: "none",
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
          aria-label="Penny Debt CTO Dashboard"
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
          Welcome, CTO{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "800" }}>
            {ctoDetails?.name || "User"}
          </span>
        </h1>

        {isLoading && <p style={{ fontSize: 14 }}>Loading data...</p>}

        {error && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: "700" }}>
            {error}
          </p>
        )}

        {!isLoading && !error && ctoDetails && (
          <>
            <section style={cardStyle} aria-labelledby="cto-info-heading">
              <h2 id="cto-info-heading" style={sectionHeadingStyle}>
                CTO Profile
              </h2>
              <p style={paragraphStyle}>
                <strong>ID:</strong> {ctoDetails.cto_id || "N/A"}
              </p>
              <p style={paragraphStyle}>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${ctoDetails.email}`} style={{ color: accentColor, textDecoration: "underline" }}>
                  {ctoDetails.email || "N/A"}
                </a>
              </p>
              <p style={paragraphStyle}>
                <strong>Role:</strong> Chief Technology Officer
              </p>
              <p style={paragraphStyle}>
                <strong>Status:</strong> {ctoDetails.status || "Active"}
              </p>
              {ctoDetails.office_location && (
                <p style={paragraphStyle}>
                  <strong>Office Location:</strong> {ctoDetails.office_location}
                </p>
              )}
            </section>

            <section style={cardStyle} aria-labelledby="tech-summary-heading">
              <h2 id="tech-summary-heading" style={sectionHeadingStyle}>
                Technology Summary
              </h2>
              <p style={paragraphStyle}>
                <strong>Projects Oversight:</strong> {ctoDetails.projects_oversight ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Teams Managed:</strong> {ctoDetails.teams_managed ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>System Uptime:</strong> {ctoDetails.system_uptime_percentage ?? "N/A"}%
              </p>
              <p style={paragraphStyle}>
                <strong>Active Initiatives:</strong> {ctoDetails.active_initiatives ?? 0}
              </p>
            </section>

            <section style={cardStyle} aria-labelledby="performance-heading">
              <h2 id="performance-heading" style={sectionHeadingStyle}>
                Monthly Performance
              </h2>
              {ctoDetails.monthly_performance ? (
                <MonthlyPerformanceChart performance={ctoDetails.monthly_performance} />
              ) : (
                <p style={paragraphStyle}>No performance data available.</p>
              )}
            </section>

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
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <li>
                  <a
                    href="/cto/projects"
                    style={{ color: accentColor, fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                  >
                    View Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/cto/teams"
                    style={{ color: accentColor, fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                  >
                    Team Management
                  </a>
                </li>
                <li>
                  <a
                    href="/cto/system-status"
                    style={{ color: accentColor, fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                  >
                    System Status
                  </a>
                </li>
                <li>
                  <a
                    href="/cto/reports"
                    style={{ color: accentColor, fontWeight: 600, fontSize: 13, textDecoration: "none" }}
                  >
                    Reports & Analytics
                  </a>
                </li>
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

// Simple monthly performance chart with bars — accepts array of objects like [{ month: 'Jan', value: 80 }, ...]
const MonthlyPerformanceChart = ({ performance }) => {
  const maxValue = Math.max(...performance.map((p) => p.value), 10);
  return (
    <div
      aria-label="Monthly Performance Chart"
      style={{ width: "100%", overflowX: "auto", paddingTop: 10 }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "flex-end",
          height: 110,
          borderBottom: "1px solid #ddd",
          paddingBottom: 12,
          fontSize: 11,
          userSelect: "none",
        }}
      >
        {performance.map(({ month, value }) => {
          const heightPercent = (value / maxValue) * 100;
          return (
            <div
              key={month}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 28,
                color: "#223759",
              }}
            >
              <div
                title={`${month}: ${value}`}
                style={{
                  height: `${heightPercent}%`,
                  width: "100%",
                  backgroundColor: "#0070f3",
                  borderRadius: 4,
                  boxShadow: "0 1px 5px rgba(0, 112, 243, 0.5)",
                  transition: "height 0.3s ease",
                }}
              />
              <span style={{ marginTop: 6, color: "#223759" }}>{month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CTODashboard;
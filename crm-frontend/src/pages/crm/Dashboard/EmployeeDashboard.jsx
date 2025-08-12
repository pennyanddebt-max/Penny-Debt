import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [loginTime, setLoginTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours > 0 ? `${hours}h` : null,
      minutes > 0 ? `${minutes}m` : null,
      `${seconds}s`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("employee");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchEmployeeDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employee-auth/${user.staff_id}`
        );
        setEmployeeDetails(res.data);
        setError(null);
      } catch {
        setError("Failed to load employee details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeDetails();

    const startTime = new Date();
    setLoginTime(startTime);

    const timerId = setInterval(() => {
      setTotalTime(Math.floor((new Date() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/login");
  };

  // Styles
  const sectionHeadingStyle = {
    color: accentColor,
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 10,
    userSelect: "none",
  };

  const paragraphStyle = {
    fontSize: 13,
    margin: "6px 0",
    color: primaryColor,
    userSelect: "text",
  };

  const linkStyle = {
    color: accentColor,
    fontWeight: 600,
    fontSize: 13,
    textDecoration: "none",
    userSelect: "text",
    transition: "color 0.3s ease",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(209, 217, 243, 0.7)",
    padding: 18,
    fontFamily,
    color: primaryColor,
    fontSize: 13,
    userSelect: "text",
    flex: "1 1 280px",
    minWidth: 280,
  };

  // Monthly Performance Chart (simple bars)
  const MonthlyPerformance = ({ targets = [], completed = [] }) => {
    /*
      targets and completed arrays contain 12 numbers for each month Jan-Dec.
      If not available, default arrays filled with zeros.
    */
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (targets.length !== 12) targets = new Array(12).fill(0);
    if (completed.length !== 12) completed = new Array(12).fill(0);

    // Determine max for scale
    const maxValue = Math.max(...targets, ...completed, 10);

    return (
      <div
        aria-label="Monthly Performance Chart"
        style={{ width: "100%", overflowX: "auto", paddingTop: 10 }}
      >
        <h3
          style={{
            ...sectionHeadingStyle,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          Monthly Performance
        </h3>
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "flex-end",
            height: 120,
            paddingBottom: 20,
            borderBottom: "1px solid #ddd",
            fontSize: 11,
          }}
        >
          {months.map((month, idx) => {
            const targetPercent = (targets[idx] / maxValue) * 100;
            const completePercent = (completed[idx] / maxValue) * 100;

            return (
              <div
                key={month}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 28,
                }}
              >
                {/* Completed bar */}
                <div
                  title={`${month} Completed: ${completed[idx]}`}
                  style={{
                    height: `${completePercent}%`,
                    width: "100%",
                    backgroundColor: accentColor,
                    borderRadius: 4,
                    transition: "height 0.3s ease",
                    boxShadow: "0 1px 6px rgba(0, 112, 243, 0.5)",
                  }}
                />
                {/* Target bar behind completed bar */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    bottom: `${completePercent}%`,
                    height: `${targetPercent - completePercent}%`,
                    width: "100%",
                    backgroundColor: "#cfdaf3",
                    borderRadius: "0 0 4px 4px",
                    marginTop: -4,
                  }}
                />
                <span
                  style={{
                    marginTop: 6,
                    color: primaryColor,
                    userSelect: "none",
                  }}
                >
                  {month}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 8, fontSize: 11, color: primaryColor }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: accentColor,
              borderRadius: 3,
              marginRight: 6,
              verticalAlign: "middle",
            }}
          /> Completed&nbsp;&nbsp;
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: "#cfdaf3",
              borderRadius: 3,
              marginRight: 6,
              verticalAlign: "middle",
            }}
          /> Target
        </div>
      </div>
    );
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
      aria-label="Employee Dashboard"
    >
      {/* Sidebar Container */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: sidebarOpen ? 280 : 60,
          backgroundColor: "#fff",
          borderRight: "1px solid #d1d9f0",
          boxShadow: "2px 0 12px rgba(209, 217, 243, 0.6)",
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: sidebarOpen ? 16 : 8,
          paddingRight: sidebarOpen ? 16 : 8,
          overflowY: "auto",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: sidebarOpen ? "center" : "flex-start",
          transition: "width 0.3s ease",
          zIndex: 1000,
        }}
      >
        {/* Penny Debt name when open */}
        {sidebarOpen && (
          <div
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: accentColor,
              marginBottom: 30,
              userSelect: "text",
              textAlign: "center",
              letterSpacing: "1.2px",
              whiteSpace: "nowrap",
            }}
            aria-label="Penny Debt Employee Dashboard"
          >
            Penny Debt
          </div>
        )}

        {/* Sidebar main menu items */}
        <div
          style={{
            flexGrow: 1,
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Sidebar collapsed={!sidebarOpen} /> {/* Pass prop if your Sidebar supports */}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          style={{
            marginTop: 20,
            alignSelf: sidebarOpen ? "center" : "flex-start",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: accentColor,
            fontSize: 20,
            userSelect: "none",
            padding: 6,
            borderRadius: 6,
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e6f0ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          type="button"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          aria-label="Logout"
          style={{
            marginTop: "auto",
            width: "100%",
            fontWeight: "700",
            fontSize: 13,
            background:
              "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: sidebarOpen ? "10px 0" : "10px 6px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220,38,38,0.8)",
            userSelect: "none",
            transition: "background 0.3s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #b91c1c 0%, #7f1d1d 100%)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)")
          }
          type="button"
          title="Logout"
        >
          {sidebarOpen ? "Logout" : "⎋"}
        </button>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: sidebarOpen ? 280 : 60,
          padding: 20,
          paddingRight: "5vw",
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "transparent",
          flexGrow: 1,
          userSelect: "text",
          maxWidth: `calc(100vw - ${sidebarOpen ? 280 : 60}px)`,
          transition: "margin-left 0.3s ease, max-width 0.3s ease",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 20,
            userSelect: "text",
          }}
        >
          Welcome,{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "700" }}>
            {employeeDetails?.name || employeeDetails?.full_name || "Employee"}
          </span>
        </h1>

        {isLoading && (
          <p style={{ fontSize: 13, color: primaryColor }}>Loading dashboard...</p>
        )}
        {error && (
          <p
            role="alert"
            style={{ color: "#dc2626", fontWeight: 700, fontSize: 13 }}
          >
            {error}
          </p>
        )}

        {!isLoading && !error && employeeDetails && (
          <>
            <section
              aria-labelledby="employee-info-heading"
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 30,
              }}
            >
              <article style={cardStyle}>
                <h2 id="employee-info-heading" style={sectionHeadingStyle}>
                  Employee Details
                </h2>
                <p style={paragraphStyle}>
                  <strong>Staff ID: </strong>
                  {employeeDetails.staff_id || "N/A"}
                </p>
                <p style={paragraphStyle}>
                  <strong>Email: </strong>
                  <a href={`mailto:${employeeDetails.email}`} style={linkStyle}>
                    {employeeDetails.email || "N/A"}
                  </a>
                </p>
                <p style={paragraphStyle}>
                  <strong>Role: </strong>
                  {employeeDetails.role || "N/A"}
                </p>
                <p style={paragraphStyle}>
                  <strong>Status: </strong>
                  {employeeDetails.status || "Active"}
                </p>
                {employeeDetails.department && (
                  <p style={paragraphStyle}>
                    <strong>Department: </strong>
                    {employeeDetails.department}
                  </p>
                )}
                {employeeDetails.location && (
                  <p style={paragraphStyle}>
                    <strong>Location: </strong>
                    {employeeDetails.location}
                  </p>
                )}
              </article>

              <article style={cardStyle} aria-live="polite" aria-atomic="true">
                <h2 style={sectionHeadingStyle}>CRM Usage</h2>
                <p style={paragraphStyle}>
                  <strong>Login Time: </strong>
                  {loginTime
                    ? loginTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Not logged in"}
                </p>
                <p style={paragraphStyle}>
                  <strong>Total Time: </strong>
                  {formatDuration(totalTime)}
                </p>
                <p
                  style={{ fontSize: 11, color: "#555", marginTop: 6 }}
                  aria-live="polite"
                >
                  Keep this page open to track session duration
                </p>
              </article>
            </section>

            <section
              aria-labelledby="work-summary-heading"
              style={{
                ...cardStyle,
                maxWidth: 520,
                marginBottom: 30,
              }}
            >
              <h2 id="work-summary-heading" style={sectionHeadingStyle}>
                Work Summary
              </h2>
              <p style={paragraphStyle}>
                <strong>Leads Managed: </strong>
                {employeeDetails.leads ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Cases Updated: </strong>
                {employeeDetails.cases ?? 0}
              </p>
              {employeeDetails.tasks_completed !== undefined && (
                <p style={paragraphStyle}>
                  <strong>Tasks Completed: </strong>
                  {employeeDetails.tasks_completed}
                </p>
              )}
              {employeeDetails.monthly_targets !== undefined && (
                <p style={paragraphStyle}>
                  <strong>Monthly Targets: </strong>
                  {employeeDetails.monthly_targets}
                </p>
              )}
            </section>

            <section
              aria-labelledby="monthly-performance-heading"
              style={{
                ...cardStyle,
                maxWidth: 700,
                marginBottom: 30,
              }}
            >
              <MonthlyPerformance
                targets={
                  employeeDetails.monthly_targets_array ||
                  new Array(12).fill(0)
                }
                completed={
                  employeeDetails.monthly_completed_array ||
                  new Array(12).fill(0)
                }
              />
            </section>

            <section
              aria-labelledby="quick-actions-heading"
              style={{
                ...cardStyle,
                maxWidth: 520,
              }}
            >
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
                {[
                  {
                    href: "/dashboard/leads/create-lead",
                    text: "Create Lead",
                    label: "Create a new lead",
                  },
                  {
                    href: "/dashboard/cases",
                    text: "View Cases",
                    label: "View all cases",
                  },
                  {
                    href: "/dashboard/collection/overdue-cases",
                    text: "Overdue Cases",
                    label: "View overdue cases",
                  },
                  {
                    href: "/dashboard/credit/cibil-check",
                    text: "CIBIL Check",
                    label: "Perform CIBIL Check",
                  },
                ].map(({ href, text, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      aria-label={label}
                      style={linkStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#005bb5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = accentColor)
                      }
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

const MonthlyPerformance = ({ targets = [], completed = [] }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (targets.length !== 12) targets = new Array(12).fill(0);
  if (completed.length !== 12) completed = new Array(12).fill(0);

  const maxValue = Math.max(...targets, ...completed, 10);

  return (
    <div
      aria-label="Monthly Performance Chart"
      style={{ width: "100%", overflowX: "auto", paddingTop: 10 }}
    >
      <h3
        style={{
          color: "#0070f3",
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 12,
          userSelect: "none",
        }}
      >
        Monthly Performance
      </h3>
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "flex-end",
          height: 120,
          paddingBottom: 20,
          borderBottom: "1px solid #ddd",
          fontSize: 11,
        }}
      >
        {months.map((month, idx) => {
          const targetPercent = (targets[idx] / maxValue) * 100;
          const completePercent = (completed[idx] / maxValue) * 100;

          return (
            <div
              key={month}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 28,
                userSelect: "none",
              }}
            >
              <div
                title={`${month} Completed: ${completed[idx]}`}
                style={{
                  height: `${completePercent}%`,
                  width: "100%",
                  backgroundColor: "#0070f3",
                  borderRadius: 4,
                  transition: "height 0.3s ease",
                  boxShadow: "0 1px 6px rgba(0, 112, 243, 0.5)",
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "relative",
                  bottom: `${completePercent}%`,
                  height: `${targetPercent - completePercent}%`,
                  width: "100%",
                  backgroundColor: "#cfdaf3",
                  borderRadius: "0 0 4px 4px",
                  marginTop: -4,
                }}
              />
              <span
                style={{
                  marginTop: 6,
                  color: "#223759",
                  userSelect: "none",
                }}
              >
                {month}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: "#223759" }}>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            backgroundColor: "#0070f3",
            borderRadius: 3,
            marginRight: 6,
            verticalAlign: "middle",
          }}
        />{" "}
        Completed&nbsp;&nbsp;
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            backgroundColor: "#cfdaf3",
            borderRadius: 3,
            marginRight: 6,
            verticalAlign: "middle",
          }}
        />{" "}
        Target
      </div>
    </div>
  );
};

export default EmployeeDashboard;
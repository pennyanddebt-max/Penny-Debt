import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const TeamLeadDashboard = () => {
  const navigate = useNavigate();
  const [teamLeadData, setTeamLeadData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const storedUser = localStorage.getItem("teamLeadUser");
    if (!storedUser) {
      setError("No active session found. Please log in.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    const fetchTeamLeadData = async () => {
      try {
        setIsLoading(true);
        const [metricsRes, membersRes, projectsRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/teamlead/${user.id}/metrics`),
          axios.get(`http://localhost:5000/api/teamlead/${user.id}/team-members`),
          axios.get(`http://localhost:5000/api/teamlead/${user.id}/ongoing-projects`),
          axios.get(`http://localhost:5000/api/teamlead/${user.id}/pending-reviews`),
        ]);
        setTeamLeadData(metricsRes.data);
        setTeamMembers(membersRes.data);
        setOngoingProjects(projectsRes.data);
        setPendingReviews(reviewsRes.data);
        setError(null);
      } catch {
        setError("Failed to load team lead dashboard data, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamLeadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teamLeadUser");
    navigate("/teamlead-login");
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
      aria-label="Team Lead Dashboard"
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
          aria-label="Penny Debt Team Lead Dashboard"
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
            {teamLeadData?.name || "Team Lead"}
          </span>
        </h1>

        {isLoading && <p>Loading team lead dashboard data...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && teamLeadData && (
          <>
            {/* Team Lead Metrics */}
            <section style={cardStyle} aria-labelledby="team-metrics-heading">
              <h2 id="team-metrics-heading" style={sectionHeadingStyle}>
                Team Metrics
              </h2>
              <p style={paragraphStyle}>
                <strong>Total Team Members:</strong> {teamLeadData.totalTeamMembers ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Ongoing Projects:</strong> {teamLeadData.ongoingProjects ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Pending Reviews:</strong> {teamLeadData.pendingReviews ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Completed Tasks This Month:</strong> {teamLeadData.completedTasks ?? 0}
              </p>
              <p style={paragraphStyle}>
                <strong>Average Project Progress:</strong>{" "}
                {teamLeadData.averageProjectProgress ? `${teamLeadData.averageProjectProgress}%` : "-"}
              </p>
            </section>

            {/* Team Members */}
            <section style={cardStyle} aria-labelledby="team-members-heading">
              <h2 id="team-members-heading" style={sectionHeadingStyle}>
                Team Members
              </h2>
              {teamMembers.length > 0 ? (
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
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Role</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Email</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{member.name}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{member.role}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{member.email}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{member.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No team members found.</p>
              )}
            </section>

            {/* Ongoing Projects */}
            <section style={cardStyle} aria-labelledby="ongoing-projects-heading">
              <h2 id="ongoing-projects-heading" style={sectionHeadingStyle}>
                Ongoing Projects
              </h2>
              {ongoingProjects.length > 0 ? (
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
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Project Name</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Start Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>End Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ongoingProjects.map((project) => (
                      <tr key={project.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{project.name}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(project.startDate)}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(project.endDate)}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {project.progress != null ? `${project.progress}%` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No ongoing projects found.</p>
              )}
            </section>

            {/* Pending Reviews */}
            <section style={cardStyle} aria-labelledby="pending-reviews-heading">
              <h2 id="pending-reviews-heading" style={sectionHeadingStyle}>
                Pending Reviews
              </h2>
              {pendingReviews.length > 0 ? (
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
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Review ID</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Project</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Assigned To</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingReviews.map((review) => (
                      <tr key={review.id} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{review.reviewId}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{review.projectName}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{review.assignedTo}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{formatDate(review.dueDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No pending reviews found.</p>
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
                  { href: "/dashboard/teamlead/team-members", text: "Manage Team Members", label: "Manage team members" },
                  { href: "/dashboard/teamlead/projects", text: "View Projects", label: "View ongoing projects" },
                  { href: "/dashboard/teamlead/reviews", text: "Review Tasks", label: "Manage pending reviews" },
                  { href: "/dashboard/teamlead/reports", text: "Reports & Analytics", label: "View reports" },
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

export default TeamLeadDashboard;
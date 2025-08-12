import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const LoanStatus = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();

  const [loanStatus, setLoanStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const fetchLoanStatus = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/loans/${loanId}/status`);
        setLoanStatus(res.data);
        setError(null);
      } catch {
        setError("Failed to load loan status information.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoanStatus();
  }, [loanId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        color: primaryColor,
        userSelect: "none",
      }}
      aria-label="Loan Status Page"
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: 200,
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
            fontWeight: "900",
            fontSize: 20,
            color: accentColor,
            marginBottom: 30,
            userSelect: "text",
            letterSpacing: "1.2px",
            textAlign: "center",
          }}
          aria-label="Penny Debt"
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
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#dc2626")}
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
        aria-live="polite"
        aria-atomic="true"
      >
        <h1
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Loan Status - ID {loanId}
        </h1>

        {isLoading && <p>Loading loan status...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && loanStatus && (
          <>
            <section
              aria-label="Current Loan Status"
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 24,
                boxShadow: "0 2px 12px rgba(209,217,243,0.6)",
                maxWidth: 720,
                userSelect: "text",
              }}
            >
              <h2 style={{ color: accentColor, fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
                Current Status
              </h2>
              <p>
                <strong>Status:</strong> {loanStatus.currentStatus || "-"}
              </p>
              <p>
                <strong>Last Updated:</strong> {formatDateTime(loanStatus.lastUpdated)}
              </p>
              <p>
                <strong>Next Action:</strong> {loanStatus.nextAction || "-"}
              </p>
            </section>

            <section
              aria-label="Loan Status History"
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 24,
                boxShadow: "0 2px 12px rgba(209,217,243,0.6)",
                maxWidth: 720,
                marginTop: 24,
                userSelect: "text",
              }}
            >
              <h2 style={{ color: accentColor, fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
                Status History
              </h2>
              {loanStatus.history && loanStatus.history.length > 0 ? (
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#eff6ff" }}>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Date</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Status</th>
                      <th style={{ padding: 8, border: "1px solid #d1d9f0" }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanStatus.history.map((entry, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #d1d9f0" }}>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {formatDateTime(entry.date)}
                        </td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>{entry.status}</td>
                        <td style={{ padding: 8, border: "1px solid #d1d9f0" }}>
                          {entry.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No status history available.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LoanStatus;
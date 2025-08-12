import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

const LoanDetails = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  const primaryColor = "#223759";
  const accentColor = "#0070f3";

  useEffect(() => {
    const fetchLoan = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/loans/${loanId}`);
        setLoan(res.data);
        setError(null);
      } catch {
        setError("Failed to load loan details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoan();
  }, [loanId]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        color: primaryColor,
        userSelect: "none",
      }}
      aria-label="Loan Details Page"
    >
      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
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
          }}
        >
          Loan Details
        </h1>

        {isLoading && <p>Loading loan details...</p>}

        {error && (
          <p style={{ color: "#dc2626", fontWeight: 700, fontSize: 14 }}>{error}</p>
        )}

        {!isLoading && !error && loan && (
          <section
            aria-label={`Details for loan ID ${loanId}`}
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 24,
              boxShadow: "0 2px 12px rgba(209,217,243,0.6)",
              maxWidth: 720,
            }}
          >
            <h2
              style={{
                color: accentColor,
                fontWeight: 700,
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              Loan Information
            </h2>

            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                rowGap: 12,
                columnGap: 16,
                fontSize: 14,
                userSelect: "text",
              }}
            >
              <dt style={{ fontWeight: "600", color: "#444" }}>Loan ID:</dt>
              <dd>{loan.loanId || loanId}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Customer Name:</dt>
              <dd>{loan.customerName || "-"}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Loan Type:</dt>
              <dd>{loan.loanType || "-"}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Application Date:</dt>
              <dd>{formatDate(loan.applicationDate)}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Approved Amount:</dt>
              <dd>{formatCurrency(loan.approvedAmount)}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Interest Rate:</dt>
              <dd>{loan.interestRate ? `${loan.interestRate}%` : "-"}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Tenure:</dt>
              <dd>{loan.tenureMonths ? `${loan.tenureMonths} months` : "-"}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>EMI Amount:</dt>
              <dd>{formatCurrency(loan.emiAmount)}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Status:</dt>
              <dd>{loan.status || "-"}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Disbursement Date:</dt>
              <dd>{formatDate(loan.disbursementDate)}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Closing Date:</dt>
              <dd>{formatDate(loan.closingDate)}</dd>

              <dt style={{ fontWeight: "600", color: "#444" }}>Contact Email:</dt>
              <dd>
                {loan.contactEmail ? (
                  <a href={`mailto:${loan.contactEmail}`} style={{ color: accentColor }}>
                    {loan.contactEmail}
                  </a>
                ) : (
                  "-"
                )}
              </dd>
              <dt style={{ fontWeight: "600", color: "#444" }}>Contact Phone:</dt>
              <dd>{loan.contactPhone || "-"}</dd>
            </dl>
          </section>
        )}
      </main>
    </div>
  );
};

export default LoanDetails;
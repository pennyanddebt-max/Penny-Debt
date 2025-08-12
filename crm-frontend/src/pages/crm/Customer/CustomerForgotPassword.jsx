import React, { useState } from "react";

const CustomerForgotPassword = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateInput = () => {
    if (!emailOrMobile.trim()) {
      setError("Please enter your email or mobile number.");
      return false;
    }
    // Basic email or mobile validation (simple heuristic)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[0-9]{7,15}$/; // simplistic mobile number check
    if (
      !emailPattern.test(emailOrMobile) &&
      !mobilePattern.test(emailOrMobile)
    ) {
      setError("Enter a valid email address or mobile number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      // TODO: Implement sending forgot password request to backend
      console.log("Password reset requested for:", emailOrMobile);
      setSuccessMessage(
        "If there is an account associated with this email or mobile, you will receive reset instructions shortly."
      );
      setEmailOrMobile("");
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <>
      <style>
        {`
          body, html, #root {
            margin: 0; padding: 0; height: 100%;
          }
          #root {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f5faff;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            box-sizing: border-box;
          }
          .input-error {
            border-color: #f56565 !important;
          }
          .error-text {
            color: #f56565;
            font-size: 12px;
            margin-top: 4px;
            font-weight: 600;
          }
          .success-text {
            color: #38a169;
            font-size: 14px;
            margin-top: 12px;
            font-weight: 600;
            text-align: center;
          }
          a {
            text-decoration: none;
            color: #0070f3;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow: "0 8px 20px rgba(0, 112, 243, 0.15)",
            padding: 40,
            maxWidth: 420,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#0070f3",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="emailOrMobile"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#333",
                marginBottom: 6,
              }}
            >
              Email or Mobile
            </label>
            <input
              type="text"
              id="emailOrMobile"
              name="emailOrMobile"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="Enter your email or mobile"
              required
              className={error ? "input-error" : ""}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: error ? 4 : 20,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) =>
                (e.target.style.borderColor = error ? "#f56565" : "#cbd5e1")
              }
            />
            {error && <div className="error-text">{error}</div>}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 0",
                backgroundColor: "#0070f3",
                color: "white",
                fontWeight: "700",
                fontSize: 18,
                borderRadius: 30,
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                boxShadow: "0 6px 14px rgba(0,112,243,0.4)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#005bb5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0070f3")
              }
            >
              Send Reset Link
            </button>
          </form>

          {successMessage && (
            <div className="success-text" role="alert">
              {successMessage}
            </div>
          )}

          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 600,
              color: "#666",
            }}
          >
            Remember your password?{" "}
            <a href="/customer-login" style={{ color: "#0070f3" }}>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerForgotPassword;
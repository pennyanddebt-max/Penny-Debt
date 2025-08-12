import React, { useState } from "react";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log("Login form submitted:", formData);
  };

  return (
    <>
      <style>
        {`
          /* Reset margin and padding - optional but helps in some cases */
          body, html, #root {
            margin: 0;
            padding: 0;
            height: 100%;
          }
          /* Use this if you mount inside #root */
          #root {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5faff",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            boxShadow: "0 8px 20px rgba(0, 112, 243, 0.15)",
            padding: 40,
            maxWidth: 400,
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
            Customer Login
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Email or Mobile */}
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
              name="emailOrMobile"
              id="emailOrMobile"
              value={formData.emailOrMobile}
              onChange={handleChange}
              placeholder="Enter your email or mobile"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: 20,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />

            {/* Password */}
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#333",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: 28,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />

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
              Sign In
            </button>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                fontWeight: 600,
                color: "#0070f3",
              }}
            >
              <a href="/customer-signup" style={{ textDecoration: "none" }}>
                Create Account
              </a>
              <a href="/customer-forgot" style={{ textDecoration: "none" }}>
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerLogin;
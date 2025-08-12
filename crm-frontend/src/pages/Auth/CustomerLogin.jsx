import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/customer-auth/login", formData);
      
      // Save token and user info to localStorage
      localStorage.setItem("customerToken", response.data.token);
      localStorage.setItem("customerUser", JSON.stringify(response.data.user));
      
      alert(response.data.message || "Login successful");
      
      // Navigate to customer dashboard
      navigate("/customer/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        background:
          "linear-gradient(135deg, #0070f3 0%, #005bb5 50%, #0070f3 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      aria-label="Customer Login Page"
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,112,243,0.15)",
          width: "100%",
          maxWidth: 400,
          padding: 36,
          boxSizing: "border-box",
          color: "#333",
        }}
      >
        <h2
          style={{
            marginBottom: 28,
            fontSize: 28,
            fontWeight: "800",
            color: "#0070f3",
            textAlign: "center",
          }}
        >
          Customer Login
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 10,
              border: "1.8px solid #cbd5e1",
              marginBottom: 20,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          />

          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: 6, fontWeight: 600 }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
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
              marginBottom: 28,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          />

          {error && (
            <div
              style={{
                color: "#f56565",
                backgroundColor: "#fed7d7",
                padding: "12px",
                borderRadius: 8,
                marginBottom: 20,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 0",
              backgroundColor: loading ? "#cbd5e1" : "#0070f3",
              color: "white",
              fontWeight: "700",
              fontSize: 18,
              borderRadius: 30,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: loading ? "none" : "0 6px 14px rgba(0,112,243,0.4)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#005bb5";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#0070f3";
              }
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: 600,
            color: "#0070f3",
          }}
        >
          <a href="/customer-forgot-password" tabIndex={0} aria-label="Forgot Password">
            Forgot Password?
          </a>
          <a href="/customer-signup" tabIndex={0} aria-label="Sign Up">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
import React, { useState } from "react";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!formData.emailOrMobile.trim()) {
      newErrors.emailOrMobile = "Email or mobile is required.";
    } else {
      // Basic email or mobile pattern check (simple)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobilePattern = /^[0-9]{7,15}$/; // simplistic mobile number check
      if (
        !emailPattern.test(formData.emailOrMobile) &&
        !mobilePattern.test(formData.emailOrMobile)
      ) {
        newErrors.emailOrMobile =
          "Enter a valid email address or mobile number.";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit signup data here
      console.log("Signup data:", formData);
      alert("Signup successful!");
      // Reset form or redirect, etc.
      setFormData({
        fullName: "",
        emailOrMobile: "",
        password: "",
        confirmPassword: "",
      });
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
          backgroundColor: "#f5faff",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
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
            Create Account
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <label
              htmlFor="fullName"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#333",
                marginBottom: 6,
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={errors.fullName ? "input-error" : ""}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: errors.fullName ? 4 : 20,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.fullName
                  ? "#f56565"
                  : "#cbd5e1")
              }
            />
            {errors.fullName && (
              <div className="error-text">{errors.fullName}</div>
            )}

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
              className={errors.emailOrMobile ? "input-error" : ""}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: errors.emailOrMobile ? 4 : 20,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.emailOrMobile
                  ? "#f56565"
                  : "#cbd5e1")
              }
            />
            {errors.emailOrMobile && (
              <div className="error-text">{errors.emailOrMobile}</div>
            )}

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
              className={errors.password ? "input-error" : ""}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: errors.password ? 4 : 20,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.password
                  ? "#f56565"
                  : "#cbd5e1")
              }
            />
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}

            {/* Confirm Password */}
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                color: "#333",
                marginBottom: 6,
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className={errors.confirmPassword ? "input-error" : ""}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 16,
                borderRadius: 10,
                border: "1.8px solid #cbd5e1",
                boxSizing: "border-box",
                marginBottom: errors.confirmPassword ? 4 : 28,
                transition: "border-color 0.3s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.confirmPassword
                  ? "#f56565"
                  : "#cbd5e1")
              }
            />
            {errors.confirmPassword && (
              <div className="error-text">{errors.confirmPassword}</div>
            )}

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
              Create Account
            </button>

            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "#666",
              }}
            >
              Already have an account?{" "}
              <a href="/customer-login" style={{ color: "#0070f3" }}>
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerSignup;
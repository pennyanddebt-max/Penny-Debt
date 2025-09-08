import React, { useMemo, useState } from "react";
import axios from "axios";

// Helper: basic validators
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidMobile = (mob) => !mob || /^[0-9\-+()\s]{7,15}$/.test(mob);

// Password strength evaluation (0-4)
function evaluatePasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "#e5e7eb" };
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
  if (/(\d)/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["#ef4444", "#f59e0b", "#f59e0b", "#10b981", "#10b981"];
  return { score, label: labels[score], color: colors[score] };
}

// Enforce minimum requirements (length >= 8 and contains number or special)
const isValidPassword = (pwd) => {
  if (typeof pwd !== "string") return false;
  const longEnough = pwd.length >= 8;
  const hasNumOrSpecial = /(\d|[^A-Za-z0-9])/.test(pwd);
  return longEnough && hasNumOrSpecial;
};

// Normalize/trim values used for validation and submission
const normalizeForm = (data) => ({
  full_name: data.full_name.trim().replace(/\s+/g, " "),
  email: data.email.trim(),
  password: data.password, // do not trim password to avoid changing intentional whitespace
  confirm_password: data.confirm_password,
  mobile: data.mobile.trim(),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";

  const pwdStrength = useMemo(() => evaluatePasswordStrength(formData.password), [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    // Clear global message
    if (message.text) setMessage({ type: "", text: "" });
  };

  const focusFirstError = (errs) => {
    const order = ["full_name", "email", "password", "confirm_password", "mobile"];
    const firstKey = order.find((k) => !!errs[k]);
    if (firstKey) {
      // Focus the field with error
      setTimeout(() => {
        const el = document.getElementById(firstKey);
        if (el?.focus) el.focus();
      }, 0);
    }
  };

  const validate = () => {
    const v = normalizeForm(formData);
    const newErrors = {};

    if (!v.full_name) newErrors.full_name = "Full name is required";
    else if (v.full_name.length < 2) newErrors.full_name = "Full name is too short";

    if (!v.email) newErrors.email = "Email is required";
    else if (!isValidEmail(v.email)) newErrors.email = "Enter a valid email";

    if (!v.password) newErrors.password = "Password is required";
    else if (!isValidPassword(v.password)) newErrors.password = "Min 8 chars and include a number or symbol";

    if (!v.confirm_password) newErrors.confirm_password = "Please confirm your password";
    else if (v.password !== v.confirm_password) newErrors.confirm_password = "Passwords do not match";

    if (!isValidMobile(v.mobile)) newErrors.mobile = "Enter a valid mobile number";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) focusFirstError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent double submit

    setMessage({ type: "", text: "" });

    if (!validate()) return;

    const payload = (() => {
      const v = normalizeForm(formData);
      // Only include fields expected by backend
      return {
        full_name: v.full_name,
        email: v.email.toLowerCase(),
        password: v.password,
        mobile: v.mobile,
      };
    })();

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/customers/signup`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      setMessage({ type: "success", text: "Signup Successful ✅" });
      // Optionally reset form
      setFormData({ full_name: "", email: "", password: "", confirm_password: "", mobile: "" });
      setErrors({});
      console.log("Server response:", res.data);
    } catch (err) {
      // Try to surface field-level errors from backend when available
      const apiMsg = err?.response?.data?.message || err?.response?.data?.error;
      const apiErrors = err?.response?.data?.errors;

      if (apiErrors) {
        let fieldErrors = {};
        if (Array.isArray(apiErrors)) {
          fieldErrors = apiErrors.reduce((acc, e) => {
            const key = e?.field || e?.param || e?.path;
            const msg = e?.msg || e?.message || "Invalid value";
            if (key) acc[key] = msg;
            return acc;
          }, {});
        } else if (typeof apiErrors === "object") {
          fieldErrors = Object.keys(apiErrors).reduce((acc, k) => {
            acc[k] = apiErrors[k]?.msg || apiErrors[k]?.message || apiErrors[k] || "Invalid value";
            return acc;
          }, {});
        }
        if (Object.keys(fieldErrors).length) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
          focusFirstError(fieldErrors);
        }
      }

      const text = apiMsg || (err.code === "ECONNABORTED" ? "Request timed out, please try again." : "Signup failed. Please check your details and try again.");
      setMessage({ type: "error", text });
      console.error("Signup error:", err?.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={mainStyle}>
      <h1 style={headingStyle}>
        Create Your Account
      </h1>
      <p style={subHeadingStyle}>
        Join Penny & Debt to start your journey towards financial freedom. Sign up now to access personalized debt relief solutions.
      </p>

      <form onSubmit={handleSubmit} style={formStyle} noValidate>
        {message.text && (
          <div
            role="alert"
            aria-live="polite"
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              marginBottom: 20,
              color: message.type === "success" ? "#065f46" : "#991b1b",
              background: message.type === "success" ? "#d1fae5" : "#fee2e2",
              border: `1px solid ${message.type === "success" ? "#10b981" : "#ef4444"}`,
              fontWeight: "600"
            }}
          >
            {message.text}
          </div>
        )}

        <label htmlFor="full_name" style={labelStyle}>
          Full Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          id="full_name"
          type="text"
          name="full_name"
          placeholder="Enter your full name"
          value={formData.full_name}
          onChange={handleChange}
          required
          disabled={submitting}
          aria-invalid={!!errors.full_name}
          aria-describedby={errors.full_name ? "full_name-error" : undefined}
          style={{
            ...inputStyle,
            border: `1.5px solid ${errors.full_name ? "#ef4444" : "#d1d9f0"}`
          }}
        />
        {errors.full_name && (
          <div id="full_name-error" style={errorStyle}>{errors.full_name}</div>
        )}

        <label htmlFor="email" style={labelStyle}>
          Email Address<span style={{ color: "red" }}> *</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={submitting}
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          style={{
            ...inputStyle,
            border: `1.5px solid ${errors.email ? "#ef4444" : "#d1d9f0"}`
          }}
        />
        {errors.email && (
          <div id="email-error" style={errorStyle}>{errors.email}</div>
        )}

        <label htmlFor="password" style={labelStyle}>
          Password<span style={{ color: "red" }}> *</span>
        </label>
        <div style={{ position: "relative", marginBottom: 8 }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Min 8 chars, include a number or symbol"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={submitting}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : "password-help"}
            style={{
              ...inputStyle,
              paddingRight: "50px",
              marginBottom: 0,
              border: `1.5px solid ${errors.password ? "#ef4444" : "#d1d9f0"}`
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #d1d9f0",
              background: "#f9fafb",
              cursor: "pointer",
              fontSize: 12,
              color: "#223759"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Password strength meter */}
        <div aria-live="polite" style={{ marginBottom: 20 }}>
          <div style={{ height: 6, background: "#f3f4f6", borderRadius: 9999, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(pwdStrength.score / 4) * 100}%`,
                background: pwdStrength.color,
                transition: "width 200ms ease",
              }}
            />
          </div>
          <div id="password-help" style={{ marginTop: 4, fontSize: 12, color: "#6b7280" }}>
            {pwdStrength.label || "Use at least 8 characters. Add upper/lowercase, numbers, and symbols for a stronger password."}
          </div>
        </div>

        {errors.password && (
          <div id="password-error" style={errorStyle}>{errors.password}</div>
        )}

        <label htmlFor="confirm_password" style={labelStyle}>
          Confirm Password<span style={{ color: "red" }}> *</span>
        </label>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <input
            id="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Re-enter your password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            disabled={submitting}
            autoComplete="new-password"
            aria-invalid={!!errors.confirm_password}
            aria-describedby={errors.confirm_password ? "confirm_password-error" : undefined}
            style={{
              ...inputStyle,
              paddingRight: "50px",
              marginBottom: 0,
              border: `1.5px solid ${errors.confirm_password ? "#ef4444" : "#d1d9f0"}`
            }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((s) => !s)}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #d1d9f0",
              background: "#f9fafb",
              cursor: "pointer",
              fontSize: 12,
              color: "#223759"
            }}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirm_password && (
          <div id="confirm_password-error" style={errorStyle}>{errors.confirm_password}</div>
        )}

        <label htmlFor="mobile" style={labelStyle}>
          Mobile Number (Optional)
        </label>
        <input
          id="mobile"
          type="tel"
          name="mobile"
          placeholder="e.g. +91 9876543210"
          value={formData.mobile}
          onChange={handleChange}
          disabled={submitting}
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={!!errors.mobile}
          aria-describedby={errors.mobile ? "mobile-error" : undefined}
          style={{
            ...inputStyle,
            border: `1.5px solid ${errors.mobile ? "#ef4444" : "#d1d9f0"}`
          }}
        />
        {errors.mobile && (
          <div id="mobile-error" style={errorStyle}>{errors.mobile}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "14px 32px",
            borderRadius: 35,
            background: submitting
              ? "linear-gradient(90deg, #a5c9ff 0%, #8bbfff 100%)"
              : "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
            color: "white",
            border: "none",
            fontWeight: "700",
            fontSize: 16,
            cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: submitting ? "none" : "0 6px 16px rgba(0, 112, 243, 0.3)",
            transition: "background 0.3s ease",
            width: "100%"
          }}
        >
          {submitting ? "Signing Up..." : "Create Account"}
        </button>
      </form>
    </main>
  );
};

const mainStyle = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  maxWidth: 500,
  margin: "auto",
  padding: "40px 20px",
  color: "#223759"
};

const headingStyle = {
  fontSize: "2.8rem",
  fontWeight: "900",
  color: "#0070f3",
  textAlign: "center",
  marginBottom: 16
};

const subHeadingStyle = {
  fontSize: "1.2rem",
  textAlign: "center",
  maxWidth: 450,
  margin: "0 auto 40px",
  lineHeight: 1.5,
  color: "#223759"
};

const formStyle = {
  backgroundColor: "#f5faff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 8px 24px rgba(0, 112, 243, 0.12)"
};

const labelStyle = {
  fontWeight: "700",
  display: "block",
  marginBottom: 6,
  fontSize: 16,
  color: "#223759"
};

const inputStyle = {
  fontSize: 16,
  padding: "10px 16px",
  width: "100%",
  maxWidth: "100%",
  borderRadius: 8,
  boxSizing: "border-box",
  marginBottom: 20,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "transparent",
  color: "#223759"
};

const errorStyle = {
  color: "#ef4444",
  marginTop: -15,
  marginBottom: 15,
  fontSize: 13,
  fontWeight: "600"
};

export default Signup;
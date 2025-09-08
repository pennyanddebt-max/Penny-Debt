import React, { useState } from "react";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    totalDebt: "",
    monthlyIncome: "",
    loanType: "personal",
    employmentStatus: "employed",
    city: "",
    pincode: "",
    message: "",
    agreeToTerms: false
  });

  const [otpData, setOtpData] = useState({
    otp: "",
    isOtpSent: false,
    isVerified: false,
    timer: 0
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setMessage("");
  };

  const handleOtpChange = (e) => {
    setOtpData(prev => ({
      ...prev,
      otp: e.target.value
    }));
    setMessage("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Please enter a valid email";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ""))) return "Please enter a valid 10-digit phone number";
    if (!formData.totalDebt || formData.totalDebt < 10000) return "Minimum debt amount is ₹10,000";
    if (!formData.monthlyIncome || formData.monthlyIncome < 5000) return "Monthly income is required";
    if (!formData.city.trim()) return "City is required";
    if (!formData.pincode.trim()) return "Pincode is required";
    if (!/^[0-9]{6}$/.test(formData.pincode)) return "Please enter a valid 6-digit pincode";
    if (!formData.agreeToTerms) return "You must agree to the terms and conditions";
    if (!otpData.isVerified) return "Please verify your email with OTP";
    return null;
  };

  const sendOtp = async () => {
    if (!formData.email.trim()) {
      setMessage("Please enter your email address first");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setSendingOtp(true);
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name || 'User'
        }),
      });

      if (!response.ok) throw new Error('Failed to send OTP');

      setOtpData(prev => ({
        ...prev,
        isOtpSent: true,
        timer: 300 // 5 minutes
      }));

      // Start countdown timer
      const countdown = setInterval(() => {
        setOtpData(prev => {
          if (prev.timer <= 1) {
            clearInterval(countdown);
            return { ...prev, timer: 0 };
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }, 1000);

      setMessage("OTP sent to your email address. Please check your inbox.");
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otpData.otp.trim()) {
      setMessage("Please enter the OTP");
      return;
    }

    setSendingOtp(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otpData.otp
        }),
      });

      if (!response.ok) throw new Error('Invalid OTP');

      setOtpData(prev => ({
        ...prev,
        isVerified: true
      }));

      setMessage("Email verified successfully!");
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'website',
          leadType: 'debt_relief',
          emailVerified: true,
          submittedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
    } catch (error) {
      setMessage("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (submitted) {
    return (
      <main style={mainStyle}>
        <div style={{
          backgroundColor: "#f5faff",
          padding: 40,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0, 112, 243, 0.12)",
          textAlign: "center",
          maxWidth: 500,
          margin: "0 auto"
        }}>
          <div style={{
            width: 60,
            height: 60,
            backgroundColor: "#0070f3",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "white",
            fontSize: "24px"
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "900",
            color: "#0070f3",
            marginBottom: 16
          }}>
            Application Submitted!
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#223759",
            lineHeight: 1.5
          }}>
            Thank you for your verified application. Our debt relief specialist will contact you within 24 hours to discuss your personalized solution.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <h1 style={headingStyle}>
        Apply for Debt Relief
      </h1>
      <p style={subHeadingStyle}>
        Take the first step towards financial freedom. Fill out the form below and our experts will create a personalized debt relief plan for you.
      </p>

      <form onSubmit={handleSubmit} style={formStyle}>
        {message && (
          <div style={{
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 20,
            color: message.includes("successfully") || message.includes("sent") ? "#065f46" : "#991b1b",
            background: message.includes("successfully") || message.includes("sent") ? "#d1fae5" : "#fee2e2",
            border: `1px solid ${message.includes("successfully") || message.includes("sent") ? "#10b981" : "#ef4444"}`,
            fontWeight: "600"
          }}>
            {message}
          </div>
        )}

        <label htmlFor="name" style={labelStyle}>
          Full Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          disabled={submitting}
          style={inputStyle}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email Address<span style={{ color: "red" }}> *</span>
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={submitting || otpData.isVerified}
                style={{ 
                  ...inputStyle, 
                  marginBottom: 0, 
                  flex: 1,
                  backgroundColor: otpData.isVerified ? "#f0f9ff" : "transparent"
                }}
              />
              {!otpData.isVerified && (
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={sendingOtp || otpData.timer > 0}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: sendingOtp || otpData.timer > 0 ? "#9ca3af" : "#0070f3",
                    color: "white",
                    border: "none",
                    fontWeight: "600",
                    fontSize: 14,
                    cursor: sendingOtp || otpData.timer > 0 ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {sendingOtp ? "Sending..." : otpData.timer > 0 ? formatTime(otpData.timer) : "Send OTP"}
                </button>
              )}
              {otpData.isVerified && (
                <div style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  background: "#10b981",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center"
                }}>
                  ✓ Verified
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone Number<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
        </div>

        {otpData.isOtpSent && !otpData.isVerified && (
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="otp" style={labelStyle}>
              Enter OTP<span style={{ color: "red" }}> *</span>
            </label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                id="otp"
                value={otpData.otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
              />
              <button
                type="button"
                onClick={verifyOtp}
                disabled={sendingOtp}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  background: sendingOtp ? "#9ca3af" : "#10b981",
                  color: "white",
                  border: "none",
                  fontWeight: "600",
                  fontSize: 14,
                  cursor: sendingOtp ? "not-allowed" : "pointer"
                }}
              >
                {sendingOtp ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="totalDebt" style={labelStyle}>
              Total Debt Amount (₹)<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="number"
              id="totalDebt"
              name="totalDebt"
              value={formData.totalDebt}
              onChange={handleChange}
              placeholder="50,000"
              required
              min="10000"
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
          <div>
            <label htmlFor="monthlyIncome" style={labelStyle}>
              Monthly Income (₹)<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              placeholder="25,000"
              required
              min="5000"
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="loanType" style={labelStyle}>
              Debt Type<span style={{ color: "red" }}> *</span>
            </label>
            <select
              id="loanType"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            >
              <option value="personal">Personal Loan</option>
              <option value="credit-card">Credit Card Debt</option>
              <option value="medical">Medical Bills</option>
              <option value="business">Business Debt</option>
              <option value="multiple">Multiple Debts</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="employmentStatus" style={labelStyle}>
              Employment Status<span style={{ color: "red" }}> *</span>
            </label>
            <select
              id="employmentStatus"
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            >
              <option value="employed">Employed</option>
              <option value="self-employed">Self Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="retired">Retired</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="city" style={labelStyle}>
              City<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Mumbai"
              required
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
          <div>
            <label htmlFor="pincode" style={labelStyle}>
              Pincode<span style={{ color: "red" }}> *</span>
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="400001"
              required
              disabled={submitting}
              style={{ ...inputStyle, marginBottom: 0 }}
            />
          </div>
        </div>

        <label htmlFor="message" style={labelStyle}>
          Additional Information
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more about your debt situation..."
          disabled={submitting}
          rows={4}
          style={{
            ...inputStyle,
            resize: "none",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
          }}
        />

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              disabled={submitting}
              style={{ marginTop: "2px" }}
            />
            <span style={{ fontSize: "14px", color: "#223759", lineHeight: 1.4 }}>
              I agree to the <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>Terms and Conditions</a> and <a href="#" style={{ color: "#0070f3", textDecoration: "underline" }}>Privacy Policy</a>. I consent to be contacted by debt relief specialists.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || !otpData.isVerified}
          style={{
            padding: "14px 32px",
            borderRadius: 35,
            background: submitting || !otpData.isVerified
              ? "linear-gradient(90deg, #a5c9ff 0%, #8bbfff 100%)"
              : "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
            color: "white",
            border: "none",
            fontWeight: "700",
            fontSize: 16,
            cursor: submitting || !otpData.isVerified ? "not-allowed" : "pointer",
            boxShadow: submitting || !otpData.isVerified ? "none" : "0 6px 16px rgba(0, 112, 243, 0.3)",
            transition: "background 0.3s ease",
            width: "100%"
          }}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </main>
  );
};

const mainStyle = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  maxWidth: 800,
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
  maxWidth: 600,
  margin: "0 auto 40px",
  lineHeight: 1.5,
  color: "#223759"
};

const formStyle = {
  backgroundColor: "#f5faff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 8px 24px rgba(0, 112, 243, 0.12)",
  marginBottom: 50
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
  border: "1.5px solid #d1d9f0",
  boxSizing: "border-box",
  marginBottom: 20,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "transparent",
  color: "#223759"
};

export default ApplyForm;
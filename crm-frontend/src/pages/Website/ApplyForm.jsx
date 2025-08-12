import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    location: "",
    debt_amount: "",
    monthly_income: "",
    existing_emis: "",
    incomeSource: "",
    occupation: "",
    debtType: "",
    additionalNotes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/apply-form/submit", formData);
      alert(res.data.message || "Application submitted successfully!");
      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        location: "",
        debt_amount: "",
        monthly_income: "",
        existing_emis: "",
        incomeSource: "",
        occupation: "",
        debtType: "",
        additionalNotes: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="apply-form-heading"
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "32px 24px",
        background: "linear-gradient(135deg, #e3f0ff 0%, #f7faff 100%)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgb(0 112 243 / 0.08)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Gradient background overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "linear-gradient(135deg, #e3f0ff 0%, #f7faff 100%)",
        }}
      />
      {/* Glassmorphism Layer */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: "80%",
          height: "80%",
          background: "rgba(255,255,255,0.45)",
          borderRadius: 32,
          backdropFilter: "blur(12px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Animated Accent Ball (brand style) */}
      <motion.div
        initial={{ y: 0, scale: 1, opacity: 0.35 }}
        animate={{ y: [0, -30, 0], scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{
          position: "fixed",
          top: "12vh",
          right: "6vw",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, #0070f3 0%, #8fb9ff 100%)",
          zIndex: 100,
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* Form container */}
      <motion.form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 800,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 36,
          boxShadow: "0 12px 40px rgb(0 112 243 / 0.15)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 24,
          boxSizing: "border-box",
          userSelect: "auto",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        noValidate
      >
        {/* Full Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="full_name" style={labelStyle}>
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={inputStyle}
            required
            disabled={submitting}
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={inputStyle}
            required
            disabled={submitting}
            autoComplete="email"
          />
        </div>

        {/* Mobile */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="mobile" style={labelStyle}>
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            style={inputStyle}
            required
            disabled={submitting}
            autoComplete="tel"
          />
        </div>

        {/* Location */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="location" style={labelStyle}>
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
            required
            disabled={submitting}
          >
            <option value="">Select your city</option>
            {/* List a subset or full list of cities here */}
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Ahmedabad">Ahmedabad</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Debt Amount */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="debt_amount" style={labelStyle}>
            Debt Amount (₹)
          </label>
          <input
            id="debt_amount"
            name="debt_amount"
            type="number"
            min="0"
            step="any"
            value={formData.debt_amount}
            onChange={handleChange}
            placeholder="Enter your total debt amount"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Monthly Income */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="monthly_income" style={labelStyle}>
            Monthly Income (₹)
          </label>
          <input
            id="monthly_income"
            name="monthly_income"
            type="number"
            min="0"
            step="any"
            value={formData.monthly_income}
            onChange={handleChange}
            placeholder="Enter your monthly income"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Existing EMIs */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="existing_emis" style={labelStyle}>
            Existing EMIs (₹)
          </label>
          <input
            id="existing_emis"
            name="existing_emis"
            type="number"
            min="0"
            step="any"
            value={formData.existing_emis}
            onChange={handleChange}
            placeholder="Enter existing EMI amount"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Income Source */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="incomeSource" style={labelStyle}>
            Income Source
          </label>
          <input
            id="incomeSource"
            name="incomeSource"
            type="text"
            value={formData.incomeSource}
            onChange={handleChange}
            placeholder="Describe your income source"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Occupation */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="occupation" style={labelStyle}>
            Occupation
          </label>
          <input
            id="occupation"
            name="occupation"
            type="text"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Enter your occupation"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Debt Type */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="debtType" style={labelStyle}>
            Debt Type
          </label>
          <input
            id="debtType"
            name="debtType"
            type="text"
            value={formData.debtType}
            onChange={handleChange}
            placeholder="Specify debt type (e.g., credit card, personal loan)"
            style={inputStyle}
            required
            disabled={submitting}
          />
        </div>

        {/* Additional Notes - full width */}
        <div
          style={{
            gridColumn: "1 / -1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="additionalNotes" style={labelStyle}>
            Additional Notes (optional)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="Provide any extra information..."
            rows={5}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: 120,
            }}
            disabled={submitting}
          />
        </div>

        {/* Submit Button - full width */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            gridColumn: "1 / -1",
            padding: "16px 0",
            fontSize: 18,
            fontWeight: "700",
            color: "#fff",
            background: submitting
              ? "linear-gradient(90deg, #8fb9ff 0%, #6a94ff 100%)"
              : "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
            border: "none",
            borderRadius: 10,
            cursor: submitting ? "not-allowed" : "pointer",
            transition: "background 0.3s ease",
            boxShadow: submitting
              ? "none"
              : "0 12px 32px rgb(0 112 243 / 0.4), 0 6px 20px rgb(0 83 181 / 0.35)",
            userSelect: "none",
          }}
          aria-busy={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </motion.form>
    </section>
  );
};

const labelStyle = {
  marginBottom: 6,
  fontWeight: "700",
  fontSize: 16,
  color: "#223759",
  userSelect: "text",
};

const inputStyle = {
  padding: "12px 16px",
  fontSize: 16,
  borderRadius: 8,
  border: "1.8px solid #d1d9f0",
  boxShadow: "inset 0 2px 6px rgb(0 0 0 / 0.05)",
  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
  outlineOffset: 2,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  userSelect: "auto",
};

export default ApplyForm;
import React, { useState } from "react";
import { motion } from "framer-motion";

const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
const fontColor = "#223759"; // consistent text color with other pages

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitted) setSubmitted(false);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit query");
      setSubmitted(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to submit query. Please try again later.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontWeight: "700",
    fontSize: 16,
    color: fontColor,
    userSelect: "text",
    fontFamily,
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 16,
    fontFamily,
    borderRadius: 8,
    border: "1.8px solid #d1d9f0",
    boxSizing: "border-box",
    outlineOffset: 2,
    marginBottom: 20,
    color: fontColor,
    userSelect: "auto",
  };

  const textareaStyle = {
    ...inputStyle,
    height: 110,
    resize: "vertical",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px 0",
    background: submitting
      ? "linear-gradient(90deg, #8bbfff 0%, #6aa1ff 100%)"
      : "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    borderRadius: 32,
    border: "none",
    cursor: submitting ? "not-allowed" : "pointer",
    userSelect: "none",
    boxShadow: submitting
      ? "none"
      : "0 8px 30px rgb(0 112 243 / 0.4), 0 4px 20px rgb(0 83 181 / 0.35)",
    transition: "background 0.3s ease",
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "32px 24px",
        background: "#f7faff",
        fontFamily,
        color: fontColor,
        userSelect: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
      aria-label="Contact Penny & Debt"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          maxWidth: 720,
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 36,
          boxShadow: "0 12px 40px rgb(0 112 243 / 0.15)",
          userSelect: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: "900",
            marginBottom: 14,
            userSelect: "none",
            color: "#0070f3",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: 18,
            marginBottom: 36,
            maxWidth: 540,
            userSelect: "text",
            color: fontColor,
            lineHeight: 1.6,
          }}
        >
          Whether you're a customer or partner, we’re here to help. Submit your
          query or reach out directly — our team will get back to you within 24
          hours.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              userSelect: "text",
              fontSize: 16,
              color: fontColor,
              lineHeight: 1.5,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 20,
                color: "#0070f3",
                userSelect: "none",
              }}
            >
              Contact Details
            </h2>
            <p>
              📧 Email:{" "}
              <strong style={{ userSelect: "text" }}>care@pennyanddebt.in</strong>
            </p>
            <p>
              ☎️ Phone:{" "}
                 <strong style={{ userSelect: "text" }}>+91 7814447895</strong>
            </p>
            <p>🏢 Address: 2nd Floor, Fintech Tower, Gurgaon, Haryana</p>
            <p>🕐 Working Hours: Mon–Sat, 9:00 AM – 6:00 PM</p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ userSelect: "auto" }}
            aria-label="Send message contact form"
          >
            {submitted && (
              <div
                role="alert"
                aria-live="polite"
                style={{
                  marginBottom: 18,
                  color: "#16a34a", // green 600
                  fontWeight: "700",
                  userSelect: "text",
                }}
              >
                ✅ Your query has been submitted!
              </div>
            )}
            {error && (
              <div
                role="alert"
                aria-live="assertive"
                style={{
                  marginBottom: 18,
                  color: "#dc2626", // red 600
                  fontWeight: "700",
                  userSelect: "text",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <label htmlFor="fullName" style={labelStyle}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={inputStyle}
              disabled={submitting}
              required
              aria-required="true"
              autoComplete="name"
              placeholder="Your full name"
            />

            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              disabled={submitting}
              required
              aria-required="true"
              autoComplete="email"
              placeholder="you@example.com"
            />

            <label htmlFor="subject" style={labelStyle}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={inputStyle}
              disabled={submitting}
              required
              aria-required="true"
              placeholder="Subject of your message"
            />

            <label htmlFor="message" style={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={textareaStyle}
              disabled={submitting}
              required
              aria-required="true"
              placeholder="Write your message here"
            ></textarea>

            <button
              type="submit"
              disabled={submitting}
              style={buttonStyle}
              aria-busy={submitting}
            >
              {submitting ? "Submitting..." : "Submit Query"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
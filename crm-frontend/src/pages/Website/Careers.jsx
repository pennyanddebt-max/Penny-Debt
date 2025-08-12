import React, { useState } from "react";

const Careers = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.resume) {
      setMessage("Please fill all required fields and upload your resume.");
      return;
    }

    // Example: You can replace this with your API call to submit the application
    setSubmitting(true);
    setTimeout(() => {
      alert("Application submitted successfully!");
      setFormData({ fullName: "", email: "", resume: null });
      setMessage("");
      setSubmitting(false);
      e.target.reset();
    }, 1500);
  };

  return (
    <main
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 800,
        margin: "auto",
        padding: "40px 20px",
        color: "#223759",
        userSelect: "none",
      }}
      aria-label="Careers page with Join Our Team application form and listings"
    >
      <h1
        style={{
          fontSize: "2.8rem",
          fontWeight: "900",
          color: "#0070f3",
          textAlign: "center",
          marginBottom: 16,
          userSelect: "text",
          backgroundColor: "transparent",
        }}
      >
        Join Our Team at Penny &amp; Debt
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
          maxWidth: 600,
          margin: "0 auto 40px",
          userSelect: "text",
          lineHeight: 1.5,
          backgroundColor: "transparent",
          color: "#223759",
        }}
      >
        We’re always looking for passionate and mission-driven people to join us. If you&apos;re ready to
        make a difference in people’s financial lives, we want to hear from you.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f5faff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0, 112, 243, 0.12)",
          userSelect: "auto",
          marginBottom: 50,
        }}
        aria-label="Job application form"
        noValidate
      >
        <label htmlFor="fullName" style={labelStyle}>
          Full Name<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          disabled={submitting}
          style={inputStyle}
        />

        <label htmlFor="email" style={labelStyle}>
          Email<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          disabled={submitting}
          style={inputStyle}
        />

        <label htmlFor="resume" style={labelStyle}>
          Upload Resume (PDF or DOCX)<span style={{ color: "red" }}> *</span>
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          required
          disabled={submitting}
          style={fileInputStyle}
        />

        {message && (
          <p
            role="alert"
            style={{
              color: "red",
              marginTop: 8,
              marginBottom: 8,
              fontWeight: "600",
              userSelect: "text",
              backgroundColor: "transparent",
            }}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: 16,
            padding: "14px 32px",
            borderRadius: 35,
            background:
              submitting
                ? "linear-gradient(90deg, #a5c9ff 0%, #8bbfff 100%)"
                : "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
            color: "white",
            border: "none",
            fontWeight: "700",
            fontSize: 16,
            cursor: submitting ? "not-allowed" : "pointer",
            userSelect: "none",
            boxShadow: submitting
              ? "none"
              : "0 6px 16px rgba(0, 112, 243, 0.3)",
            transition: "background 0.3s ease",
            width: "100%",
          }}
          aria-disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      <section aria-labelledby="openings-heading" style={{ userSelect: "text", backgroundColor: "transparent" }}>
        <h2
          id="openings-heading"
          style={{
            fontSize: "2.4rem",
            fontWeight: "900",
            color: "#0070f3",
            marginBottom: 24,
            userSelect: "none",
            backgroundColor: "transparent",
          }}
        >
          💼 Current Openings
        </h2>

        <div style={{ marginBottom: 36 }}>
          <h3 style={categoryHeadingStyle}>👔 Financial Advisors</h3>
          <ul style={listStyle}>
            <li>Senior Financial Advisor &ndash; Mumbai</li>
            <li>Junior Financial Consultant &ndash; Remote</li>
            <li>Personal Financial Planner &ndash; Bangalore</li>
          </ul>
        </div>

        <div style={{ marginBottom: 36 }}>
          <h3 style={categoryHeadingStyle}>📢 Marketing</h3>
          <ul style={listStyle}>
            <li>Digital Marketing Executive &ndash; Remote</li>
            <li>Social Media Strategist &ndash; Gurgaon</li>
            <li>SEO Specialist &ndash; Hyderabad</li>
          </ul>
        </div>

        <div>
          <h3 style={categoryHeadingStyle}>🧑‍💻 Internships</h3>
          <ul style={listStyle}>
            <li>Social Media Intern &ndash; Gurgaon</li>
            <li>Loan Solutions Intern &ndash; Mumbai</li>
            <li>Market Research Intern &ndash; Remote</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

const labelStyle = {
  fontWeight: "700",
  display: "block",
  marginBottom: 6,
  fontSize: 16,
  color: "#223759",
  backgroundColor: "transparent",
};

const inputStyle = {
  fontSize: 16,
  padding: "10px 16px",
  width: "100%",
  maxWidth: "100%",
  borderRadius: 8,
  border: "1.5px solid #d1d9f0",
  boxSizing: "border-box",
  outlineOffset: 2,
  marginBottom: 20,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  backgroundColor: "transparent",
  color: "#223759",
};

const fileInputStyle = {
  ...inputStyle,
  padding: "6px 12px",
  cursor: "pointer",
};

const categoryHeadingStyle = {
  fontSize: "1.8rem",
  fontWeight: "700",
  marginBottom: 12,
  color: "#005bb5",
  userSelect: "none",
  backgroundColor: "transparent",
};

const listStyle = {
  listStyleType: "disc",
  paddingLeft: 20,
  fontSize: 16,
  color: "#223759",
  lineHeight: 1.6,
  backgroundColor: "transparent",
};

export default Careers;
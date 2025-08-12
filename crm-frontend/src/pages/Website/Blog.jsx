import React from "react";

// Move all style declarations here BEFORE blogs array
const sectionTitleStyle = {
  fontSize: "2.2rem",
  fontWeight: "700",
  color: "#005bb5",
  marginBottom: 20,
  marginTop: 40,
  userSelect: "none",
};

const subSectionTitleStyle = {
  fontSize: "1.6rem",
  fontWeight: "700",
  color: "#144e8d",
  marginBottom: 12,
  userSelect: "none",
};

const miniTitleStyle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#2361bc",
  marginTop: 24,
  marginBottom: 8,
  userSelect: "none",
};

const paragraphStyle = {
  fontSize: 18,
  lineHeight: 1.6,
  marginBottom: 20,
  color: "#223759",
  userSelect: "text",
};

const blockquoteStyle = {
  fontStyle: "italic",
  color: "#334e68",
  borderLeft: "4px solid #7db7ff",
  paddingLeft: 20,
  marginBottom: 24,
  userSelect: "text",
  backgroundColor: "#f0f8ff",
  borderRadius: 6,
};

const listStyle = {
  marginLeft: 24,
  marginBottom: 20,
  listStyleType: "disc",
  color: "#223759",
  fontSize: 17,
  userSelect: "text",
};

const checklistStyle = {
  ...listStyle,
  listStyleType: "none",
  marginLeft: 0,
  paddingLeft: 0,
};

const iconListStyle = {
  ...checklistStyle,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 1.6,
};

const callToActionStyle = {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
  userSelect: "text",
};

const buttonStyle = {
  display: "inline-block",
  backgroundColor: "#0070f3",
  color: "white",
  padding: "14px 32px",
  borderRadius: 30,
  fontWeight: "700",
  fontSize: 18,
  textDecoration: "none",
  marginTop: 20,
  userSelect: "none",
  boxShadow: "0 12px 30px rgb(0 112 243 / 0.45), 0 6px 20px rgb(0 83 181 / 0.35)",
  transition: "background-color 0.3s ease",
};

const blogs = [
  {
    id: 1,
    title: "The Silent Burden – How Debt Is Crippling Our Health and What You Can Do About It",
    published: "August 2025",
    author: "Penny & Debt Insights",
    content: (
      <>
        <h2 style={sectionTitleStyle}>💣 The Invisible Weight of Debt</h2>
        <p style={paragraphStyle}>
          Debt is more than a financial issue — it's a silent killer of mental peace, physical health, and personal freedom. Many individuals in India live with the constant stress of repaying credit cards, personal loans, payday loans, or being harassed by collection agencies. What most don’t realize is how deeply this burden invades the mind, body, and soul.
        </p>
        <blockquote style={blockquoteStyle}>
          “I wasn’t just losing money… I was losing sleep, health, and my will to fight.” <br />
          <em>— A client testimonial from Delhi</em>
        </blockquote>

        <h3 style={subSectionTitleStyle}>🧬 How Debt Affects Your Health</h3>
        <h4 style={miniTitleStyle}>Mental Health Breakdown</h4>
        <ul style={listStyle}>
          <li>Chronic stress from debt triggers anxiety, depression, and panic attacks.</li>
          <li>Feelings of hopelessness and shame are common.</li>
          <li>People often avoid social interactions or isolate themselves.</li>
        </ul>

        <h4 style={miniTitleStyle}>Sleep Disruption</h4>
        <ul style={listStyle}>
          <li>The anxiety of unpaid EMIs or credit calls often leads to insomnia.</li>
          <li>Lack of rest fuels fatigue, reduced focus, and physical breakdown.</li>
        </ul>

        <h4 style={miniTitleStyle}>Relationship Strain</h4>
        <ul style={listStyle}>
          <li>Financial stress causes friction in marriages and families.</li>
          <li>Many clients share that they fight regularly with loved ones over money.</li>
        </ul>

        <h4 style={miniTitleStyle}>Physical Illness</h4>
        <ul style={listStyle}>
          <li>Headaches, high blood pressure, heart disease — all are linked to chronic financial stress.</li>
          <li>Skipping health treatments due to lack of funds worsens the condition.</li>
        </ul>

        <h2 style={sectionTitleStyle}>📞 Loan Harassment: A Silent Abuse</h2>
        <p style={paragraphStyle}>
          Thousands of individuals are illegally harassed by banks and recovery agents. Calls at odd hours, threats of legal action, visiting your workplace or home — it’s not just illegal, it’s mentally devastating.
        </p>
        <p style={paragraphStyle}>
          At Penny & Debt, we step in and handle these calls legally and ethically — so you can breathe again.
        </p>

        <h2 style={sectionTitleStyle}>💡 The Penny & Debt Difference</h2>
        <ul style={checklistStyle}>
          <li>We negotiate with banks and create legally protected repayment plans</li>
          <li>We stop harassment calls through official communication</li>
          <li>We rebuild your credit score step by step</li>
          <li>We offer confidential counselling to help you emotionally recover</li>
        </ul>

        <h2 style={sectionTitleStyle}>🛡️ Real Stories. Real Freedom.</h2>
        <blockquote style={blockquoteStyle}>
          “I was on the verge of giving up… then Penny & Debt helped me settle my ₹3.5 lakh loan into a manageable amount. More than that, they saved my mental health.”
          <br />
          <em>— Meenakshi, Pune</em>
        </blockquote>
        <blockquote style={blockquoteStyle}>
          “I couldn’t talk to my parents about my credit card mess. This team didn’t just support me legally, they became my emotional backbone.”
          <br />
          <em>— Rajat, Bangalore</em>
        </blockquote>

        <h2 style={sectionTitleStyle}>🔓 You Are Not Alone</h2>
        <p style={paragraphStyle}>
          Financial struggles don’t define your worth. They’re temporary — and solvable with the right team. Penny & Debt is India’s first complete debt resolution platform combining:
        </p>

        <ul style={iconListStyle}>
          <li>📜 Legal Expertise</li>
          <li>💼 Financial Advisory</li>
          <li>❤️ Empathy & Support</li>
          <li>🧾 Affordable Plans</li>
        </ul>

        <h2 style={sectionTitleStyle}>✊ Take the First Step Toward Freedom</h2>
        <p style={callToActionStyle}>💬 Speak to our counsellors</p>
        <p style={callToActionStyle}>📝 Fill the confidential assessment form</p>
        <p style={callToActionStyle}>📞 Stop the calls. Start your recovery.</p>

        <a href="/apply" style={buttonStyle} aria-label="Join Penny & Debt today">
          👉 Join Penny & Debt Today
        </a>
      </>
    ),
  },
];

const Blog = () => {
  const blog = blogs[0];

  return (
    <article
      style={{
        maxWidth: 880,
        margin: "48px auto",
        padding: "0 24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#223759",
        userSelect: "text",
      }}
      aria-labelledby="blog-title"
    >
      <header style={{ marginBottom: 40 }}>
        <h1
          id="blog-title"
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 14,
            color: "#0070f3",
            userSelect: "none",
          }}
        >
          🧠 {blog.title}
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#555",
            userSelect: "none",
            marginBottom: 4,
          }}
        >
          Published: {blog.published}
        </p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#555",
            userSelect: "none",
          }}
        >
          By: {blog.author}
        </p>
      </header>

      <section>{blog.content}</section>
    </article>
  );
};

export default Blog;
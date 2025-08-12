import React from "react";

const About = () => {
  const sectionStyle = {
    maxWidth: 920,
    margin: "60px auto",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#223759",
    lineHeight: 1.7,
    userSelect: "text",
  };

  const headingStyle = {
    color: "#0070f3",
    fontWeight: "900",
    fontSize: "2.4rem",
    marginBottom: 24,
    userSelect: "none",
  };

  const subheadingStyle = {
    fontWeight: "700",
    fontSize: "1.6rem",
    marginTop: 36,
    marginBottom: 12,
    color: "#005bb5",
    userSelect: "none",
  };

  const listItemStyle = {
    marginBottom: 12,
  };

  return (
    <section id="about" style={sectionStyle} aria-labelledby="about-heading">
      <h1 id="about-heading" style={headingStyle}>
        🧭 About Penny &amp; Debt
      </h1>
      <p>
        Penny &amp; Debt was founded with a simple yet profound belief: no one should feel trapped by debt. In a world where financial pressure can affect your health, relationships, and future, we step in as your trusted ally. Our mission goes beyond numbers — we’re here to restore your peace of mind.
      </p>
      <p>
        We combine legal expertise, ethical financial practices, and deep empathy to help you tackle your financial challenges. Whether it's overwhelming EMIs, credit card defaults, or loan harassment from recovery agents — we listen first, act next, and stand by your side until the burden is lifted.
      </p>
      <p>
        With Penny &amp; Debt, you don’t just get a service — you get a second chance.
      </p>

      <h2 style={subheadingStyle}>🎯 Our Mission</h2>
      <p>
        To make debt resolution simple, affordable, and stigma-free for every Indian household.
      </p>
      <p>
        We are committed to delivering personalized financial solutions, always rooted in transparency, legality, and trust. By demystifying financial jargon and empowering individuals with knowledge, we help them reclaim their confidence and control over their finances.
      </p>

      <h2 style={subheadingStyle}>🌠 Our Vision</h2>
      <p>
        To become India’s most trusted name in debt advisory — not just by solving problems, but by creating a future where financial literacy, emotional well-being, and long-term stability go hand in hand.
      </p>
      <p>
        We aim to help over 10 million Indians by 2030, building a movement where financial freedom isn’t a privilege, but a right.
      </p>

      <h2 style={subheadingStyle}>❤️ Our Core Values</h2>
      <ul>
        <li style={listItemStyle}>
          <strong>Empathy First:</strong> We treat every client with respect, compassion, and understanding — no judgment, only support.
        </li>
        <li style={listItemStyle}>
          <strong>Confidentiality Guaranteed:</strong> Your personal and financial information is safe with us. Discretion is a promise we never break.
        </li>
        <li style={listItemStyle}>
          <strong>Integrity in Every Step:</strong> We believe in doing what’s right — not what’s easy. Honesty is the foundation of every solution we offer.
        </li>
        <li style={listItemStyle}>
          <strong>Affordable, Legal Solutions:</strong> We offer solutions that are not only effective but also 100% legal and compliant — with plans starting as low as ₹599/month.
        </li>
        <li style={listItemStyle}>
          <strong>Result-Oriented Approach:</strong> We don’t believe in empty promises. Our services are designed to deliver real, measurable outcomes — whether it’s stopping harassing calls, improving your credit score, or negotiating better repayment terms.
        </li>
      </ul>

      <h2 style={subheadingStyle}>💬 Why Choose Penny &amp; Debt?</h2>
      <p>
        Whether you're:
      </p>
      <ul>
        <li style={listItemStyle}>Facing constant calls from loan recovery agents,</li>
        <li style={listItemStyle}>Struggling with EMIs and mounting interest,</li>
        <li style={listItemStyle}>Worried about your CIBIL score ruining your future,</li>
        <li style={listItemStyle}>Or just want someone who listens and understands your stress…</li>
      </ul>
      <p>
        We are here. We don’t judge. We educate, protect, and guide you toward a debt-free, peaceful life.
      </p>
      <p>
        At Penny &amp; Debt, we don’t just provide services — we give you a second chance at financial freedom.
      </p>
    </section>
  );
};

export default About;
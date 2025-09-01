
import React, { useState, useEffect, useRef } from "react";

// Animated Stat Card Component
const StatCard = ({ label, value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let incrementTime = 18;
    let step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div style={{
      minWidth: 180,
      minHeight: 110,
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 24px rgba(0,112,243,0.10)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 18px 18px 18px",
      margin: 8,
      position: "relative",
      overflow: "hidden",
      animation: "fadeInUp 1s cubic-bezier(.23,1.02,.64,1)"
    }}>
      <div style={{
        fontSize: 38,
        fontWeight: 900,
        color: "#0070f3",
        letterSpacing: 1,
        marginBottom: 6,
        textShadow: "0 2px 8px #0070f322"
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div style={{
        fontSize: 18,
        color: "#223759cc",
        fontWeight: 600,
        letterSpacing: 0.5
      }}>{label}</div>
      <div style={{
        position: "absolute",
        bottom: -18,
        right: -18,
        width: 48,
        height: 48,
        background: "#eaf5ff",
        borderRadius: "50%",
        zIndex: 0
      }} />
    </div>
  );
};

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;

/* Reusable Button with hover animation */
const Button = ({ children, onClick, style, to, ariaLabel }) => {
  const baseStyle = {
    padding: "12px 28px",
    borderRadius: 40,
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    background: "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
    boxShadow: "0 8px 22px rgba(0, 112, 243, 0.4)",
    transition: "background 0.3s ease, boxShadow 0.3s ease, transform 0.2s ease",
    textDecoration: "none",
    display: to ? "inline-block" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    fontFamily,
    ...style,
  };

  const hoverStyle = {
    background: "linear-gradient(90deg, #005bb5 0%, #003f87 100%)",
    boxShadow: "0 12px 36px rgba(0, 83, 181, 0.65)",
    transform: "scale(1.08)",
  };

  if (to) {
    return (
      <a
        href={to}
        style={baseStyle}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, {
            background: baseStyle.background,
            boxShadow: baseStyle.boxShadow,
            transform: "none",
          })
        }
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      style={baseStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, {
          background: baseStyle.background,
          boxShadow: baseStyle.boxShadow,
          transform: "none",
        })
      }
      type="button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};


/* Hero Section with advanced gradient text, background blur circles & floating shapes */
const Hero = () => {
  const floatingStyle = (delay, size, x, y, bgColor, opacity = 0.15) => ({
    position: "absolute",
    top: y,
    left: x,
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: bgColor,
    opacity,
    animation: `floatUpDown 6s ease-in-out infinite`,
    animationDelay: delay,
    filter: "blur(14px)",
    pointerEvents: "none",
  });



  const messages = [
    "Empowering Your Financial Freedom with Compassion & Expertise",
    "Expert Debt Relief, Credit Recovery & Legal Support Tailored for You",
    "Your Path to Debt-Free Living Starts Here – With Penny & Debt",
    "Transparent, Trusted & Proven Debt Solutions for Lasting Results",
  ];
  const [messageIndex] = useState(0);

  return (
    <>
      <section
        id="home"
        style={{
          minHeight: "85vh",
          backgroundColor: "#f5faff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "80px 48px",
          fontFamily,
          flexWrap: "wrap",
          gap: 28,
          overflow: "hidden",
          position: "relative",
        }}
        aria-label="Hero section introducing Penny & Debt - India's premier debt relief service"
      >
        <style>{`
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-22px); }
          }
          .gradient-text {
            background: linear-gradient(
              90deg,
              #0070f3,
              #00b4ff,
              #005bb5,
              #0070f3,
              #00b4ff
            );
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            user-select: none;
          }
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
        <div style={{ maxWidth: 560, flex: "1 1 420px", textAlign: "left", userSelect: "text" }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 900,
              marginBottom: 22,
              color: "#0070f3",
              lineHeight: 1.08,
              userSelect: "none",
              textShadow: "0 3px 8px rgba(0,112,243,0.3)",
            }}
            className="gradient-text"
          >
            India's Best Debt Relief Service Provider
          </h1>
          <p
            style={{
              fontSize: 24,
              marginBottom: 36,
              color: "#223759cc",
              fontWeight: 600,
              minHeight: 80,
              lineHeight: 1.45,
              fontFamily: "'Segoe UI', sans-serif",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {messages[messageIndex]}
          </p>
          <Button to="#applyform" ariaLabel="Get started with Penny & Debt">
            Get Started Today
          </Button>
        </div>
        <div
          style={{
            flex: "1 1 460px",
            maxWidth: 460,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            borderRadius: 20,
            boxShadow: "0 14px 48px rgba(0,112,243,0.22)",
            background: "linear-gradient(135deg, #eaf5ff 25%, #ffffff 95%)",
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          {/* Replace with your high-res debt relief illustration */}
          <img
            src={"/assets/debt-relief-illustration.png"}
            alt="Relieved individual breaking free from chains of debt, symbolizing financial freedom"
            style={{
              width: "100%",
              maxWidth: 360,
              borderRadius: 20,
              filter: "drop-shadow(0 0 10px rgba(0,83,181,0.3))",
              animation: "floatUpDown 6s ease-in-out infinite",
            }}
            loading="eager"
            decoding="async"
          />
          <div style={floatingStyle("0s", 130, "6%", "8%", "#0070f3", 0.16)} />
          <div style={floatingStyle("2s", 92, "78%", "30%", "#00b4ff", 0.12)} />
          <div style={floatingStyle("4s", 110, "82%", "70%", "#005bb5", 0.1)} />
        </div>
      </section>
    </>
  );
  };
// Extended About Section with multi-paragraph info & professional tone
// Extended About Section with multi-paragraph info & professional tone
const About = () => {
  return (
    <section
      style={{
        fontFamily,
        color: "#2c3e50",
        userSelect: "text",
        fontSize: 18,
        lineHeight: 1.62,
        fontWeight: 500,
        padding: "48px 0",
        maxWidth: 900,
        margin: "0 auto"
      }}
      aria-label="About Penny & Debt - Our Mission and Expertise"
    >
      <h2
        style={{
          fontSize: 38,
          fontWeight: 900,
          color: "#0070f3",
          marginBottom: 28,
          userSelect: "none",
        }}
      >
        About Penny & Debt
      </h2>
      <p>
        Whether you're struggling with credit card balances, personal loans, or unsecured debts, Penny & Debt provides a realistic pathway out of financial distress — with no hidden fees or confusing jargon, just honest advice and actionable solutions. Join over 5,000 satisfied clients who have transformed their financial lives with our guidance.
      </p>
    </section>
  );
};

/* Steps Section refined with clear, action-based steps */
const Steps = () => {
  const steps = [
    {
      title: "Subscribe & Schedule Your Free Consultation",
      description:
        "Get started easily by paying our secure subscription fee and booking a one-on-one assessment with a certified debt advisor.",
    },
    {
      title: "Receive Your Custom Debt Relief Plan",
      description:
        "Our experts analyze your financial situation thoroughly and propose a strategy tailored to lower your repayments and lift debts legally.",
    },
    {
      title: "We Negotiate On Your Behalf",
      description:
        "Our trusted legal partners liaise directly with creditors to waive interest, penalties, and negotiate settlements that work for you.",
    },
    {
      title: "Follow The Plan, Receive Full Support",
      description:
        "You make simplified payments while our team closely monitors progress, providing guidance, updates, and emotional support at every milestone.",
    },
    {
      title: "Rebuild Credit & Secure Your Future",
      description:
        "Once debt clearance is complete, receive expert coaching on budgeting, credit monitoring, and smart financial planning for lasting freedom.",
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        margin: "80px auto",
        maxWidth: 960,
        padding: "48px 24px",
        fontFamily,
        userSelect: "text",
        backgroundColor: "#fff",
        boxShadow: "0 12px 30px rgba(0,112,243,0.16)",
        borderRadius: 20,
      }}
      aria-label="Detailed 5-step process to get debt relief with Penny & Debt"
    >
      <h2
        style={{
          fontSize: 36,
          fontWeight: "900",
          textAlign: "center",
          color: "#0070f3",
          marginBottom: 48,
          userSelect: "none",
        }}
      >
        How You Get Debt Relief In 5 Simple Steps
      </h2>
      <ol
        style={{
          counterReset: "step-counter",
          listStyle: "none",
          paddingLeft: 0,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {steps.map(({ title, description }, idx) => (
          <li
            key={idx}
            style={{
              counterIncrement: "step-counter",
              paddingLeft: 80,
              position: "relative",
              marginBottom: 40,
              color: "#1e3a8a",
              userSelect: "text",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 56,
                height: 56,
                borderRadius: "50%",
                background:
                  "linear-gradient(90deg, #0070f3 0%, #005bb5 100%)",
                color: "white",
                fontWeight: "900",
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0, 83, 181, 0.35)",
                userSelect: "none",
              }}
            >
              {idx + 1}
            </span>
            <h3
              style={{
                fontWeight: "700",
                fontSize: 26,
                marginBottom: 10,
                color: "#00467f",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                maxWidth: 670,
                color: "#33475b",
              }}
            >
              {description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

/* Services cards with icon styling, smooth shadow and scale on hover/focus */
const Services = () => {
  const services = [
    {
      icon: "🛡️",
      title: "Comprehensive Debt Relief Programs",
      description:
        "Flexible, manageable plans that decrease total debt while improving your cash flow and credit health.",
    },
    {
      icon: "⚖️",
      title: "Legal Advisory & Harassment Protection",
      description:
        "We protect you from aggressive creditor tactics and unlawful harassment with stringent legal counsel.",
    },
    {
      icon: "📈",
      title: "Credit Score Enhancement Strategies",
      description:
        "Tailored advice and monitoring to boost your credit standing, paving the way for better financial opportunities.",
    },
    {
      icon: "💰",
      title: "Personalized Financial Planning & Budget Guidance",
      description:
        "Expert budgeting strategies and money management coaching to sustain your newly gained freedom from debt.",
    },
    {
      icon: "🔍",
      title: "Loan Eligibility & Approval Assistance",
      description:
        "Our experts assess your position to improve future loan approvals and provide clarity on eligibility criteria.",
    },
    {
      icon: "🤝",
      title: "Effective Lender Negotiation & Settlements",
      description:
        "Utilizing our reputation and legal backing, we secure favorable settlements to ease debts and reduce penalties.",
    },
  ];

  return (
    <section
      id="services"
      style={{
        padding: "85px 30px",
        backgroundColor: "#eef6ff",
        maxWidth: 1240,
        margin: "0 auto 90px",
        display: "flex",
        flexWrap: "wrap",
        gap: 28,
        justifyContent: "center",
        fontFamily,
        userSelect: "text",
      }}
      aria-label="Detailed services offered by Penny & Debt"
    >
      {services.map(({ icon, title, description }, i) => (
        <div
          key={i}
          tabIndex={0}
          role="article"
          aria-label={title}
          style={{
            flex: "1 1 300px",
            backgroundColor: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 28px rgba(0, 112, 243, 0.16)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "default",
            outline: "none",
            userSelect: "text",
          }}
          onFocus={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 14px 42px rgba(0, 112, 243, 0.32)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0, 112, 243, 0.16)";
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 14px 42px rgba(0, 112, 243, 0.32)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0, 112, 243, 0.16)";
          }}
        >
          <div style={{ fontSize: 52, marginBottom: 18, color: "#0070f3" }} aria-hidden="true">
            {icon}
          </div>
          <h3
            style={{
              fontSize: 22,
              color: "#004280",
              marginBottom: 14,
              fontWeight: 700,
              userSelect: "text",
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 17, color: "#2a3c5b", lineHeight: 1.7 }}>{description}</p>
        </div>
      ))}
    </section>
  );
};

/* Why Choose Us section with icon pills and stable color theme */
const whyChoosePoints = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#0070f3" strokeWidth="3" fill="#e3f0ff"><animate attributeName="r" values="18;20;18" dur="1.6s" repeatCount="indefinite"/></circle><polyline points="28 15 18 25 12 19" fill="none" stroke="#00b894" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><animate attributeName="points" values="28 15 18 25 12 19;28 17 18 27 12 21;28 15 18 25 12 19" dur="2s" repeatCount="indefinite"/></polyline></svg>
    ),
    text: "Transparent, Honest Process - No Hidden Fees",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#ff9800" strokeWidth="3" fill="#fff8e1"><animate attributeName="r" values="18;20;18" dur="1.8s" repeatCount="indefinite"/></circle><path d="M20 12v8l6 4" stroke="#ff9800" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><animate attributeName="d" values="M20 12v8l6 4;M20 14v10l6 6;M20 12v8l6 4" dur="2.2s" repeatCount="indefinite"/></path></svg>
    ),
    text: "Trusted by Over 5,000+ Satisfied Clients Nationwide",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#00bcd4" strokeWidth="3" fill="#e0f7fa"><animate attributeName="r" values="18;20;18" dur="1.7s" repeatCount="indefinite"/></circle><path d="M14 20l4 4 8-8" stroke="#00bcd4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><animate attributeName="d" values="M14 20l4 4 8-8;M14 22l4 6 8-10;M14 20l4 4 8-8" dur="2s" repeatCount="indefinite"/></path></svg>
    ),
    text: "Guaranteed 100% Confidentiality & Data Security",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#e91e63" strokeWidth="3" fill="#fce4ec"><animate attributeName="r" values="18;20;18" dur="1.5s" repeatCount="indefinite"/></circle><path d="M20 14v8" stroke="#e91e63" strokeWidth="3.5" strokeLinecap="round"/><circle cx="20" cy="26" r="2" fill="#e91e63"><animate attributeName="r" values="2;3;2" dur="1.2s" repeatCount="indefinite"/></circle></svg>
    ),
    text: "Experienced, Certified Debt & Legal Experts – No Bots",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#4caf50" strokeWidth="3" fill="#e8f5e9"><animate attributeName="r" values="18;20;18" dur="1.9s" repeatCount="indefinite"/></circle><path d="M16 24l4-8 4 8" stroke="#4caf50" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><animate attributeName="d" values="M16 24l4-8 4 8;M16 26l4-10 4 10;M16 24l4-8 4 8" dur="2.1s" repeatCount="indefinite"/></path></svg>
    ),
    text: "Available In Multiple Regional Languages & Dialects",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-choose-animate"><circle cx="20" cy="20" r="18" stroke="#9c27b0" strokeWidth="3" fill="#f3e5f5"><animate attributeName="r" values="18;20;18" dur="1.6s" repeatCount="indefinite"/></circle><rect x="14" y="18" width="12" height="4" rx="2" fill="#9c27b0"><animate attributeName="width" values="12;16;12" dur="1.8s" repeatCount="indefinite"/></rect></svg>
    ),
    text: "Flexible EMI & Customized Lump Sum Settlement Options",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      id="why"
      style={{
        maxWidth: 1200,
        margin: "100px auto 120px",
        padding: "60px 20px 70px 20px",
        fontFamily,
        userSelect: "text",
        borderRadius: 32,
        background: "linear-gradient(135deg, #e3f0ff 0%, #f3e5f5 100%)",
        boxShadow: "0 16px 48px rgba(0, 112, 243, 0.13)",
        textAlign: "center",
        color: "#1e2e56",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Why choose Penny & Debt for your debt relief needs"
    >
      <h2
        style={{
          fontSize: 40,
          fontWeight: "900",
          color: "#0070f3",
          marginBottom: 18,
          userSelect: "none",
          letterSpacing: 1.2,
        }}
      >
        Why Choose Penny & Debt?
      </h2>
      <div style={{fontSize: 22, color: "#4a148c", fontWeight: 600, marginBottom: 38, letterSpacing: 0.5}}>
        Your Trusted Partner for Debt Relief, Legal Protection & Financial Freedom
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: 36,
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {whyChoosePoints.map(({ icon, text }, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 8px 32px rgba(0, 112, 243, 0.10)",
              padding: "38px 24px 32px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 220,
              transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 18px 48px rgba(0, 112, 243, 0.18)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 112, 243, 0.10)";
            }}
          >
            <div style={{ marginBottom: 22 }}>{icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1a237e", marginBottom: 0, letterSpacing: 0.2, lineHeight: 1.4 }}>{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* Testimonials with smoother crossfade and keyboard accessibility */
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sonia Patel",
      location: "New Delhi, India",
      text:
        "Penny & Debt made my debt vanish like magic! Their team was incredibly supportive with a plan that worked seamlessly with my income. The transparent process and constant communication built my trust every step of the way. Highly recommend!",
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai, India",
      text:
        "I was drowning in debt with multiple lenders, but Penny & Debt negotiated for me, reducing the total significantly. The legal protection from harassment was a relief I never expected. This service truly changes lives.",
    },
    {
      name: "Sumit Kumar",
      location: "Delhi, India",
      text:
        "Quick, trustworthy service with genuine care. After completing their program, my credit score improved dramatically, and I secured a personal loan with better terms. A heartfelt thank you to the Penny & Debt team!",
    },
  ];

  const [current, setCurrent] = useState(0);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    fadeTimeoutRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 7000);
    return () => {
      clearInterval(fadeTimeoutRef.current);
    };
  }, [testimonials.length]);

  return (
    <>
      <style>{`
        .fade-quote {
          opacity: 0;
          animation: fadeInOpacity 1.6s forwards;
        }
        @keyframes fadeInOpacity {
          to {
            opacity: 1;
          }
        }
      `}</style>
      <section
        id="testimonials"
        style={{
          backgroundColor: "#f5fbff",
          padding: "64px 36px",
          maxWidth: 940,
          margin: "0 auto 110px",
          borderRadius: 22,
          boxShadow: "0 12px 36px rgba(0, 112, 243, 0.18)",
          fontFamily,
          userSelect: "text",
          textAlign: "center",
          color: "#2a3e68",
          position: "relative",
        }}
        aria-labelledby="testimonials-title"
      >
        <h2
          id="testimonials-title"
          style={{ fontSize: 38, fontWeight: "900", marginBottom: 54, color: "#005bb5" }}
        >
          What Our Clients Say
        </h2>

        <blockquote
          key={current}
          className="fade-quote"
          style={{
            fontSize: 20,
            fontStyle: "italic",
            marginBottom: 26,
            minHeight: 130,
            maxWidth: 780,
            margin: "0 auto",
            lineHeight: 1.6,
            transition: "opacity 0.8s ease-in-out",
            userSelect: "text",
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          “{testimonials[current].text}”
        </blockquote>
        <cite
          style={{
            display: "block",
            fontWeight: "800",
            fontSize: 18,
            color: "#004280",
            userSelect: "text",
          }}
        >
          - {testimonials[current].name}, {testimonials[current].location}
        </cite>

        <div
          style={{
            marginTop: 42,
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-pressed={i === current}
              style={{
                width: 16,
                height: 16,
                backgroundColor: i === current ? "#005bb5" : "#bcd8ff",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                boxShadow: i === current ? "0 0 14px #003d73" : "none",
                outlineOffset: 3,
                padding: 0,
                transition: "background-color 0.3s ease, box-shadow 0.4s ease",
              }}
              type="button"
              tabIndex={0}
            />
          ))}
        </div>
      </section>
    </>
  );
};

/* GPT-4 Powered Debt Guru Chatbot connecting to OpenAI API */
const DebtGuruChatbot = () => {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ""; // Make sure to set this in your .env file
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi! I'm Debt Guru 🤖, powered by GPT-4. Ask me anything about debt relief, credit rebuilding, or Penny & Debt’s services!",
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Chat bot user submit handler that calls OpenAI GPT-4 API
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { from: "user", text: input.trim(), id: Date.now() };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    const newMessages = [...messages, userMessage];
    try {
      // Abort prev request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Build messages in chat format for OpenAI
      const chatMessagesForOpenAI = newMessages.map((m) =>
        m.from === "user"
          ? { role: "user", content: m.text }
          : { role: "assistant", content: m.text }
      );

      // Add system prompt to guide the AI
      chatMessagesForOpenAI.unshift({
        role: "system",
        content:
          "You are Debt Guru, an expert debt relief advisor. Answer questions about debt settlement, credit improvement, financial planning, and Penny & Debt's services in a helpful and concise manner.",
      });

      // Call OpenAI Chat Completion API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: abortControllerRef.current.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: chatMessagesForOpenAI,
          max_tokens: 350,
          temperature: 0.7,
          n: 1,
          stop: null,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI error: ${response.statusText}`);
      }
      const data = await response.json();
      const botReply = data.choices[0].message.content.trim();

      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: botReply, id: Date.now() + 1 },
      ]);
    } catch (err) {
      if (err.name === "AbortError") {
        // Request aborted, ignore
        return;
      }
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text:
            "Sorry, I'm having trouble answering right now. Please try again later or ask another question.",
          id: Date.now() + 1,
        },
      ]);
      console.error("OpenAI Chatbot error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .chat-toggle-button {
          position: fixed;
          bottom: 28px;
          right: 28px;
          background: #0070f3;
          border-radius: 50%;
          width: 66px;
          height: 66px;
          box-shadow: 0 6px 14px rgba(0,112,243,0.5);
          border: none;
          cursor: pointer;
          color: white;
          font-size: 28px;
          z-index: 10000;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.2));
        }
        .chat-toggle-button:hover {
          background: #005bb5;
          box-shadow: 0 10px 26px rgba(0,112,243,0.8);
        }
        .chat-window {
          position: fixed;
          bottom: 110px;
          right: 28px;
          width: 360px;
          max-height: 490px;
          background: white;
          border-radius: 22px;
          box-shadow: 0 10px 48px rgba(0,112,243,0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: ${fontFamily};
          user-select: text;
          z-index: 10000;
          color: #1c2e60;
        }
        .chat-header {
          background-color: #0070f3;
          color: white;
          padding: 16px 24px;
          font-weight: 800;
          font-size: 20px;
          user-select: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
        }
        .chat-close-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 26px;
          cursor: pointer;
          user-select: none;
          line-height: 1;
          padding: 0;
          font-weight: 700;
          transition: color 0.2s ease;
        }
        .chat-close-btn:hover,
        .chat-close-btn:focus {
          color: #a6c8ff;
          outline: none;
        }
        .chat-messages {
          flex-grow: 1;
          padding: 18px 22px;
          overflow-y: auto;
          background: #f5faff;
          font-size: 15px;
          line-height: 1.5;
          scroll-behavior: smooth;
        }
        .chat-message {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          max-width: 87%;
          word-wrap: break-word;
          white-space: pre-wrap;
          border-radius: 16px;
          padding: 10px 16px;
          box-shadow: 0 3px 8px rgba(0,83,181,0.1);
          user-select: text;
        }
        .chat-message.bot {
          align-self: flex-start;
          background: linear-gradient(135deg, #d6e5ff 0%, #a8c8ff 100%);
          color: #00396b;
          font-weight: 600;
          border-top-left-radius: 4px;
        }
        .chat-message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, #0070f3 0%, #005bb5 100%);
          color: white;
          font-weight: 700;
          border-top-right-radius: 4px;
          box-shadow: 0 4px 14px rgba(0,83,181,0.35);
        }
        .chat-input-area {
          display: flex;
          border-top: 1px solid #d1d9f0;
          padding: 10px 14px;
          background: #fafcff;
          gap: 8px;
        }
        .chat-input {
          flex-grow: 1;
          font-size: 15px;
          padding: 12px 14px;
          border-radius: 16px;
          border: 1.8px solid #bad1ff;
          resize: none;
          font-family: ${fontFamily};
          outline-offset: 3px;
          outline-color: #0070f3;
          max-height: 110px;
          min-height: 36px;
          user-select: text;
        }
        .chat-input:focus {
          border-color: #005bb5;
          box-shadow: 0 0 8px #005bb5bb;
        }
        .chat-send-button {
          background-color: #0070f3;
          border: none;
          color: white;
          border-radius: 16px;
          padding: 10px 24px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          user-select: none;
          transition: background 0.3s ease;
          box-shadow: 0 6px 18px rgba(0,112,243,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chat-send-button:hover:not(:disabled),
        .chat-send-button:focus:not(:disabled) {
          background-color: #004a9e;
          box-shadow: 0 10px 30px rgba(0,83,181,0.7);
          outline: none;
        }
        .chat-send-button:disabled {
          opacity: 0.45;
          cursor: default;
          box-shadow: none;
        }
        .loading-spinner {
          border: 3px solid rgba(0, 83, 181, 0.2);
          border-top-color: #005bb5;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          animation: spin 1s linear infinite;
          margin-left: 6px;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {open && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="debt-guru-title"
          className="chat-window"
        >
          <header className="chat-header">
            <span id="debt-guru-title">Debt Guru 🤖 (GPT-4)</span>
            <button
              aria-label="Close chat"
              className="chat-close-btn"
              onClick={() => setOpen(false)}
              type="button"
              title="Close chat window"
            >
              &times;
            </button>
          </header>
          <div className="chat-messages" tabIndex={-1} aria-live="polite" aria-relevant="additions">
            {messages.map(({ id, from, text }) => (
              <div key={id} className={`chat-message ${from}`}>
                {text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="chat-input-area"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              aria-label="Type your message to Debt Guru"
              className="chat-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              autoFocus
              spellCheck="true"
              placeholder="Ask me about debt relief..."
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="chat-send-button"
              aria-disabled={!input.trim() || loading}
              aria-label={loading ? "Loading chatbot response" : "Send message"}
              title={loading ? "Loading chatbot response" : "Send message"}
            >
              {loading ? (
                <>
                  Sending
                  <span className="loading-spinner" aria-hidden="true" />
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </section>
      )}
      <button
        aria-label={open ? "Close Debt Guru chatbot" : "Open Debt Guru chatbot"}
        title="Debt Guru Chatbot"
        className="chat-toggle-button"
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        💬
      </button>
    </>
  );
};

/**
 * IMPORTANT:
 * To use OpenAI GPT-4 integration, you must create an .env file in your React project root:
 * REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
 * Never commit your API key to public repos.
 * Make sure to run `npm start` or `yarn start` after setting env variables.
 * This implementation uses fetch directly to the OpenAI API.
 *
 * If you don't have an API key or prefer not to use GPT, chat gracefully falls back to polite error messages.
 */




// Main Home page component
const Home = () => (
  <div style={{ backgroundColor: "#f9fbff", color: "#2c3e50", minHeight: "100vh", position: "relative" }}>
    {/* Main content */}
    <main style={{ maxWidth: 1300, margin: "0 auto", padding: "0 24px" }}>
      <Hero />
      <About />
      <Steps />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </main>
    {/* GPT-4 powered Debt Guru Chatbot */}
    <DebtGuruChatbot />
  </div>
);

export default Home;
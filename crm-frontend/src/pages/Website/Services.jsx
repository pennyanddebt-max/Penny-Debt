import React from "react";

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
const mainContainerStyle = {
  background: "#eef6ff",
  color: "#2c3e50",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};
const servicesList = [
  {
    icon: "🛡️",
    title: "Debt Relief Programs",
    description:
      "Affordable settlement and repayment plans tailored to ease your financial burden. We analyze your debt situation and create a custom plan that fits your needs and budget.",
    details: [
      "Personalized debt assessment",
      "Negotiation with lenders",
      "Flexible repayment options",
      "Legal protection throughout the process"
    ]
  },
  {
    icon: "⚖️",
    title: "Legal Advisory & Anti-Harassment",
    description:
      "Protect yourself from debt harassment with expert legal assistance. Our team ensures your rights are protected and you receive fair treatment.",
    details: [
      "Legal advice for debt cases",
      "Protection from creditor harassment",
      "Support in court proceedings",
      "Documentation and compliance"
    ]
  },
  {
    icon: "📉",
    title: "Credit Score Improvement",
    description:
      "Roadmaps and steps tailored for rebuilding your credit score effectively. We guide you through proven strategies to boost your financial reputation.",
    details: [
      "Credit report analysis",
      "Dispute resolution",
      "Credit rebuilding plans",
      "Financial literacy coaching"
    ]
  },
  {
    icon: "💼",
    title: "Financial Planning & Budgeting",
    description:
      "Expert advice for budgeting wisely and maintaining debt-free living. Our planners help you set realistic goals and stick to them.",
    details: [
      "Monthly budget setup",
      "Expense tracking",
      "Savings strategies",
      "Debt prevention tips"
    ]
  },
  {
    icon: "🔍",
    title: "Loan Eligibility Analysis",
    description:
      "Assessment to improve your chances for future loan approvals. We help you understand lender requirements and prepare your profile.",
    details: [
      "Eligibility check",
      "Profile improvement",
      "Documentation review",
      "Pre-approval guidance"
    ]
  },
  {
    icon: "🤝",
    title: "Lender Negotiation & Settlement",
    description:
      "We negotiate with lenders to reduce your debt and cut penalties legally. Our experts work to get you the best possible terms.",
    details: [
      "Direct negotiation with banks",
      "Penalty and interest reduction",
      "Settlement agreements",
      "Ongoing support until closure"
    ]
  }
];

const Services = () => {
  return (
    <section style={mainContainerStyle}>
      {servicesList.map(({ icon, title, description, details }, i) => (
        <div
          key={i}
          style={{
            flex: "1 1 320px",
            backgroundColor: "#fff",
            borderRadius: 16,
            boxShadow: "0 6px 16px rgba(0, 112, 243, 0.15)",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "default",
            marginBottom: 18,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-8px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(0, 112, 243, 0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 112, 243, 0.15)";
          }}
        >
          <div style={{ fontSize: 54, marginBottom: 16, color: "#0070f3" }}>{icon}</div>
          <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 14, fontWeight: 800 }}>{title}</h3>
          <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6, marginBottom: 14 }}>{description}</p>
          <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: 260, paddingLeft: 0, color: "#223759", fontSize: 15, listStyle: "disc inside", marginBottom: 0 }}>
            {details.map((d, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default Services;
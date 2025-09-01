import React from "react";

const fontFamily = `'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
const mainContainerStyle = {
  background: "#eef6ff",
  color: "#2c3e50",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

// Loan Products Section
const loanProducts = [
  {
    icon: "🏠",
    title: "Home Loan",
    description: "Get the best rates for new home purchase, balance transfer, or top-up. Flexible tenure, fast approval, and expert support from application to disbursal.",
    features: [
      "Loan up to ₹5 Cr+",
      "Tenure up to 30 years",
      "Balance transfer & top-up options",
      "Doorstep documentation & support",
    ],
  },
  {
    icon: "👤",
    title: "Personal Loan",
    description: "Quick, collateral-free loans for any purpose—medical, travel, wedding, or debt consolidation. Minimal paperwork, instant eligibility check, and fast disbursal.",
    features: [
      "Loan up to ₹40 lakh",
      "Tenure up to 6 years",
      "No collateral required",
      "Flexible EMI options",
    ],
  },
  {
    icon: "🏢",
    title: "Loan Against Property",
    description: "Unlock the value of your property for business, education, or personal needs. High eligibility, lower rates, and transparent process.",
    features: [
      "Loan up to ₹10 Cr+",
      "Residential & commercial property",
      "Flexible tenure & part-payment",
      "Quick processing",
    ],
  },
  {
    icon: "📈",
    title: "Loan on Mutual Funds",
    description: "Get instant liquidity without selling your investments. Pledge mutual funds for a flexible overdraft or term loan.",
    features: [
      "Loan up to 80% of fund value",
      "No foreclosure charges",
      "Continue earning returns",
      "Quick online process",
    ],
  },
  {
    icon: "🚗",
    title: "Car Loan",
    description: "Finance your new or used car with attractive rates, fast approval, and minimal documentation.",
    features: [
      "Loan up to 100% on-road price",
      "Tenure up to 7 years",
      "Low interest rates",
      "Pre-approved offers for select customers",
    ],
  },
  {
    icon: "🔵",
    title: "Low CIBIL/Score Loans",
    description: "Specialized solutions for customers with low or no credit score. We match you with lenders who look beyond your CIBIL.",
    features: [
      "Loan up to ₹10 lakh",
      "Custom eligibility assessment",
      "Credit improvement guidance",
      "No hidden charges",
    ],
  },
];

// Other Services Section
const servicesList = [
  {
    icon: "🛡️",
    title: "Debt Relief Programs",
    description:
      "Affordable settlement and repayment plans tailored to ease your financial burden. We analyze your debt situation and create a custom plan that fits your needs and budget. Includes negotiation, legal protection, and ongoing support.",
    details: [
      "Personalized debt assessment",
      "Negotiation with lenders",
      "Flexible repayment options",
      "Legal protection throughout the process",
      "Ongoing case management",
    ],
  },
  {
    icon: "⚖️",
    title: "Legal Advisory & Anti-Harassment",
    description:
      "Protect yourself from debt harassment with expert legal assistance. Our team ensures your rights are protected, provides court support, and handles all documentation.",
    details: [
      "Legal advice for debt cases",
      "Protection from creditor harassment",
      "Support in court proceedings",
      "Documentation and compliance",
      "Representation in legal matters",
    ],
  },
  {
    icon: "📉",
    title: "Credit Score Improvement",
    description:
      "Roadmaps and steps tailored for rebuilding your credit score effectively. We guide you through proven strategies, dispute resolution, and financial literacy coaching.",
    details: [
      "Credit report analysis",
      "Dispute resolution",
      "Credit rebuilding plans",
      "Financial literacy coaching",
      "Ongoing credit monitoring",
    ],
  },
  {
    icon: "💼",
    title: "Financial Planning & Budgeting",
    description:
      "Expert advice for budgeting wisely and maintaining debt-free living. Our planners help you set realistic goals, track expenses, and build savings.",
    details: [
      "Monthly budget setup",
      "Expense tracking",
      "Savings strategies",
      "Debt prevention tips",
      "Goal-based planning",
    ],
  },
  {
    icon: "🔍",
    title: "Loan Eligibility Analysis",
    description:
      "Assessment to improve your chances for future loan approvals. We help you understand lender requirements, improve your profile, and prepare documentation.",
    details: [
      "Eligibility check",
      "Profile improvement",
      "Documentation review",
      "Pre-approval guidance",
      "Lender matching",
    ],
  },
  {
    icon: "🤝",
    title: "Lender Negotiation & Settlement",
    description:
      "We negotiate with lenders to reduce your debt and cut penalties legally. Our experts work to get you the best possible terms and support you until closure.",
    details: [
      "Direct negotiation with banks",
      "Penalty and interest reduction",
      "Settlement agreements",
      "Ongoing support until closure",
      "Transparent process",
    ],
  },
];

const Services = () => {
  return (
    <main style={{ background: "#f9fbff", minHeight: "100vh", fontFamily }}>
      {/* Our Services Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 24px 24px" }}>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#0070f3",
            marginBottom: 18,
            textAlign: "center",
          }}
        >
          Our Services
        </h1>
        <div style={{fontSize: 20, color: "#4a148c", fontWeight: 600, marginBottom: 38, letterSpacing: 0.5, textAlign: "center"}}>
          Debt relief, legal protection, credit improvement, and more—your path to financial freedom starts here.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {servicesList.map(({ icon, title, description, details }, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: 18,
                boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 112, 243, 0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 36px rgba(0, 112, 243, 0.18)";
              }}
            >
              <div
                style={{
                  fontSize: 54,
                  marginBottom: 16,
                  color: "#0070f3",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontSize: 26,
                  color: "#005bb5",
                  marginBottom: 14,
                  fontWeight: 800,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: 17,
                  color: "#33475b",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                {description}
              </p>
              <ul
                style={{
                  textAlign: "left",
                  margin: "0 auto",
                  maxWidth: 260,
                  paddingLeft: 0,
                  color: "#223759",
                  fontSize: 16,
                  listStyle: "disc inside",
                  marginBottom: 0,
                }}
              >
                {details.map((d, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Loan Solutions Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 48px 24px" }}>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#0070f3",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Additional Loan Solutions
        </h2>
        <div style={{fontSize: 20, color: "#4a148c", fontWeight: 600, marginBottom: 38, letterSpacing: 0.5, textAlign: "center"}}>
          Explore our premium loan products for every need—home, personal, property, car, and more.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {loanProducts.map(({ icon, title, description, features }, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#fff",
                borderRadius: 18,
                boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 112, 243, 0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 36px rgba(0, 112, 243, 0.18)";
              }}
            >
              <div
                style={{
                  fontSize: 54,
                  marginBottom: 16,
                  color: "#0070f3",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontSize: 26,
                  color: "#005bb5",
                  marginBottom: 14,
                  fontWeight: 800,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: 17,
                  color: "#33475b",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                {description}
              </p>
              <ul
                style={{
                  textAlign: "left",
                  margin: "0 auto",
                  maxWidth: 260,
                  paddingLeft: 0,
                  color: "#223759",
                  fontSize: 16,
                  listStyle: "disc inside",
                  marginBottom: 0,
                }}
              >
                {features.map((f, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#0070f3",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Step 1: Consultation
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              Schedule a consultation with our experts to discuss your debt situation and
              understand your needs.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Step 2: Customized Plan
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              We create a personalized debt relief plan tailored to your financial situation and
              goals.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Step 3: Negotiation & Settlement
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              Our experts negotiate with lenders to reduce your debt and secure a settlement that
              works for you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#0070f3",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Benefits of Our Services
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Reduced Debt
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              We help you reduce your debt burden and achieve financial freedom.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Improved Credit Score
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              Our services help you improve your credit score and maintain a healthy financial
              profile.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              boxShadow: "0 10px 36px rgba(0, 112, 243, 0.18)",
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 22, color: "#005bb5", marginBottom: 12 }}>
              Stress Relief
            </h3>
            <p style={{ fontSize: 16, color: "#33475b", lineHeight: 1.6 }}>
              Let us handle the negotiations and settlements, so you can focus on your financial
              well-being.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
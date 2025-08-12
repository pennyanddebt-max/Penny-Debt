import React, { useState } from "react";

const faqData = [
  {
    question: "What is Penny & Debt and how does it help me?",
    answer:
      "Penny & Debt is a debt relief platform designed to help individuals struggling with debt. We provide personalized legal support, financial planning, and creditor negotiation strategies to reduce your debt burden and help you regain financial control. All this is available for just ₹599/month.",
  },
  {
    question: "Is my information safe with Penny & Debt?",
    answer:
      "Yes. Your privacy is our priority. All the data you share with us is encrypted and strictly confidential. We do not share or sell your information to third parties. Only our verified in-house legal and finance teams access your case to assist you.",
  },
  {
    question: "Will you talk to the banks and recovery agents on my behalf?",
    answer:
      "Absolutely. Once you're enrolled, our legal team handles all communication with banks and recovery agents. You won't have to deal with harassing calls anymore—we take over and ensure all conversations are lawful and professional.",
  },
  {
    question: "How soon can I expect results after enrolling?",
    answer:
      "Typically, within 48–72 hours of enrollment, our team starts your case analysis and reaches out to creditors. While debt resolution timelines vary, most clients see a significant reduction in harassment and progress in negotiations within the first few weeks.",
  },
  {
    question: "What’s included in the ₹599 monthly subscription?",
    answer:
      "Your subscription includes complete legal guidance, debt counseling, bank negotiation, harassment protection, and access to your personalized dashboard. You’ll also receive regular progress updates and credit improvement plans tailored to your situation.",
  },
  {
    question: "Do I qualify even if I have multiple loans or cards in default?",
    answer:
      "Yes. We specialize in handling multiple debts—including personal loans, credit cards, payday loans, and EMI defaults. Whether your credit score is low or you’re already in default, we’ll work with you to build a realistic plan.",
  },
  {
    question: "Can I cancel the service anytime?",
    answer:
      "Yes, there are no lock-in contracts. You can cancel your subscription at any time directly from your dashboard or by contacting our support team. However, we recommend completing the debt resolution cycle for the best results.",
  },
  {
    question: "Will this affect my credit score?",
    answer:
      "Initially, there may be a temporary dip if you're already in default. But over time, our resolution efforts aim to stabilize and improve your credit score. We also guide you on rebuilding your score post-resolution.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section
      style={{
        maxWidth: 800,
        margin: "48px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#223759",
        userSelect: "text",
      }}
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        style={{
          fontSize: "2.4rem",
          fontWeight: "900",
          color: "#0070f3",
          marginBottom: 28,
          userSelect: "none",
        }}
      >
        Frequently Asked Questions
      </h2>

      <dl>
        {faqData.map(({ question, answer }, i) => (
          <div
            key={i}
            style={{
              marginBottom: 20,
              borderRadius: 12,
              boxShadow: "0 0 8px rgba(0,0,0,0.07)",
              backgroundColor: "#f9fbff",
              userSelect: "text",
            }}
          >
            <dt>
              <button
                aria-expanded={activeIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                onClick={() => toggleIndex(i)}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  textAlign: "left",
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#005bb5",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  borderRadius: 12,
                  userSelect: "text",
                }}
              >
                {question}
                <span
                  aria-hidden="true"
                  style={{
                    float: "right",
                    fontWeight: "900",
                    fontSize: 22,
                    lineHeight: 1,
                    transform: activeIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    userSelect: "none",
                  }}
                >
                  +
                </span>
              </button>
            </dt>
            <dd
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              hidden={activeIndex !== i}
              style={{
                padding: activeIndex === i ? "0 24px 20px" : "0 24px",
                fontSize: 16,
                color: "#223759",
                lineHeight: 1.5,
                userSelect: "text",
              }}
            >
              {answer}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className="mt-8 text-center"
        style={{
          marginTop: 48,
          textAlign: "center",
          userSelect: "text",
        }}
      >
        <h4
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#4a5568",
            userSelect: "none",
          }}
        >
          Still have questions?
        </h4>
        <p
          style={{
            fontSize: 14,
            color: "#718096",
            marginBottom: 16,
            userSelect: "text",
          }}
        >
          Our support team is here to help. Reach out and get clarity on your debt solution.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 24px",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        >
          Contact Support
        </a>
      </div>
    </section>
  );
};

export default FAQ;
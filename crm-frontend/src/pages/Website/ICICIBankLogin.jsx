import React, { useState } from "react";


export default function ICICIBankLogin() {
  const [aadhaar, setAadhaar] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [loginId, setLoginId] = useState("");

  // Generate a random login ID (e.g., ICICI12345678) after payment
  const handlePayment = () => {
    const id = "ICICI" + Math.floor(10000000 + Math.random() * 90000000);
    setLoginId(id);
    setPaymentDone(true);
  };

  const handleChange = (idx, value) => {
    if (/^\d{0,4}$/.test(value)) {
      const newAadhaar = [...aadhaar];
      newAadhaar[idx] = value;
      setAadhaar(newAadhaar);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aadhaar.every((v) => v.length === 4)) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff7ef", fontFamily: "'Segoe UI', Arial, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px #ff7f0022", maxWidth: 900, width: "100%", display: "flex", overflow: "hidden" }}>
        {/* Left Side */}
        <div style={{ background: "#fff7ef", padding: 40, flex: 1.1, minWidth: 340 }}>
          <img src="/logos/icici-logo.svg" alt="ICICI Bank" style={{ height: 32, marginBottom: 32 }} />
          <h2 style={{ color: "#333", fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Get your <span style={{ color: "#ff7f00" }}>Home Loan</span></h2>
          <div style={{ color: "#666", fontSize: 18, marginBottom: 18 }}>in 6 simple steps</div>
          <div style={{ background: "#fff3e0", borderRadius: 8, padding: 12, display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ color: "#ff7f00", fontWeight: 600, fontSize: 15 }}>On an average, people get their loan sanctioned in 5-10 days</span>
          </div>
          <div style={{ marginBottom: 18, fontWeight: 600, color: "#ff7f00", fontSize: 16 }}>1</div>
          <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 16, marginBottom: 10 }}>
            <div style={{ color: "#4caf50", fontWeight: 600, marginBottom: 6 }}>✔ Mobile Number 9103656497</div>
            <div style={{ color: "#2196f3", fontWeight: 600 }}>✔ PAN DWPPS5980B</div>
          </div>
          <div style={{ color: "#bbb", fontSize: 15, marginTop: 18 }}>2 Personalise your loan</div>
          <div style={{ color: "#bbb", fontSize: 15 }}>3 Customise your loan</div>
        </div>
        {/* Right Side */}
        <div style={{ background: "#fffaf6", padding: 40, flex: 1.2, minWidth: 340, borderLeft: "1.5px solid #ffe0b2", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={{ fontWeight: 600, color: "#ff7f00", fontSize: 18, marginBottom: 18 }}>Enter Your Aadhaar Number</div>
              <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                {aadhaar.map((v, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={4}
                    value={v}
                    onChange={e => handleChange(i, e.target.value.replace(/\D/g, ""))}
                    style={{
                      width: 64,
                      height: 48,
                      fontSize: 24,
                      border: "2px solid #ffb74d",
                      borderRadius: 8,
                      textAlign: "center",
                      outline: "none",
                      background: "#fff",
                      color: "#333",
                      fontWeight: 700,
                      boxShadow: "0 2px 8px #ffb74d22"
                    }}
                    required
                  />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <input type="checkbox" checked readOnly style={{ accentColor: "#ff7f00", marginRight: 8 }} />
                <span style={{ fontSize: 13, color: "#555" }}>I agree to the terms and conditions</span>
              </div>
              <button type="submit" style={{ width: "100%", background: "linear-gradient(90deg,#ff7f00,#ffb74d)", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 8, padding: "14px 0", marginBottom: 18, cursor: "pointer", boxShadow: "0 4px 16px #ffb74d44" }}>Continue</button>
              <div style={{ background: "#fff3e0", borderRadius: 8, padding: 10, color: "#ff7f00", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>Entering Aadhaar details will make your process 60% faster.</div>
              <div style={{ background: "#fff3e0", borderRadius: 8, padding: 10, color: "#ff7f00", fontWeight: 600, fontSize: 15 }}>This will help fulfill your KYC guidelines easily</div>
              <div style={{ color: "#ff7f00", fontSize: 12, marginTop: 18 }}>Please do not click on your internet browser's back or refresh button during the application process. Only use the ICICI's page back button if available.</div>
            </form>
          ) : (
            <div style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 48, color: "#4caf50", marginBottom: 18 }}>✔</div>
              <div style={{ fontWeight: 700, fontSize: 24, color: "#333", marginBottom: 10 }}>Login Successful</div>
              <div style={{ color: "#ff7f00", fontSize: 18, fontWeight: 600, marginBottom: 18 }}>Welcome to ICICI Bank Loan Portal</div>
              <div style={{ color: "#555", fontSize: 15, marginBottom: 24 }}>Your Aadhaar has been verified. You can now proceed with your loan application.</div>
              {/* Payment Section */}
              <div style={{ background: "#fff3e0", borderRadius: 10, padding: 24, margin: "32px auto 0 auto", maxWidth: 340, boxShadow: "0 2px 12px #ffb74d22" }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#ff7f00", marginBottom: 10 }}>Pay Login Fees</div>
                <div style={{ color: "#333", fontSize: 16, marginBottom: 18 }}>A one-time login fee is required to continue your loan application process.</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#0070f3", marginBottom: 18 }}>₹6879.40</div>
                {paymentDone ? (
                  <>
                    <div style={{ color: '#4caf50', fontWeight: 700, fontSize: 18, margin: '18px 0 8px 0' }}>
                      Payment Successful!
                    </div>
                    <div style={{ color: '#0070f3', fontWeight: 700, fontSize: 17, margin: '10px 0 0 0' }}>
                      Your Login ID: <span style={{ background: '#eaf5ff', padding: '2px 10px', borderRadius: 6, fontFamily: 'monospace', fontSize: 18 }}>{loginId}</span>
                    </div>
                  </>
                ) : (
                  <button
                    style={{ width: "100%", background: "linear-gradient(90deg,#ff7f00,#ffb74d)", color: "#fff", fontWeight: 700, fontSize: 18, border: "none", borderRadius: 8, padding: "14px 0", cursor: "pointer", boxShadow: "0 4px 16px #ffb74d44", transition: "background 0.2s" }}
                    onClick={handlePayment}
                  >
                    Pay Now
                  </button>
                )}
                <div style={{ color: "#ff7f00", fontSize: 12, marginTop: 12 }}>Secure payment powered by ICICI Bank</div>
                <div style={{ color: "#555", fontSize: 13, marginTop: 10 }}>
                  <b>Note:</b> You can complete your payment within 30 minutes after login. Please ensure timely payment to continue your loan application process.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

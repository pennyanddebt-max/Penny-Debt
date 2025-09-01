import React, { useEffect, useState } from "react";

const MarketingDashboard = () => {
  const [loanApps, setLoanApps] = useState([]);
  const [careerApps, setCareerApps] = useState([]);

  useEffect(() => {
    fetch("/api/loan-applications")
      .then((res) => res.json())
      .then(setLoanApps);
    fetch("/api/careers")
      .then((res) => res.json())
      .then(setCareerApps);
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Marketing Dashboard</h1>
      <h2>Loan Applications</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Amount</th><th>Product</th><th>Purpose</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loanApps.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td><td>{a.email}</td><td>{a.phone}</td><td>{a.amount}</td><td>{a.product}</td><td>{a.purpose}</td><td>{a.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginTop: 40 }}>Career Applications</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Resume</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {careerApps.map((a) => (
            <tr key={a.id}>
              <td>{a.fullName}</td><td>{a.email}</td><td><a href={a.resume_path} target="_blank" rel="noopener noreferrer">Download</a></td><td>{a.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingDashboard;

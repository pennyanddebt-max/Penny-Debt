import React from 'react';

const AdvisorReports = () => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(to right, #0070f3, #005bb5)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 20 }}>Penny & Debt</h1>
      <h2 style={{ fontSize: 28 }}>Welcome to the Reports Page</h2>
      <p style={{ fontSize: 18, marginTop: 10 }}>Role: <strong>Advisor</strong></p>
    </div>
  );
};

export default AdvisorReports;

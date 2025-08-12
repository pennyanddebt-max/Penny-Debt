import React from 'react';

const CustomerDashboard = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', padding: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Modern Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', boxShadow: '0 4px 24px #dbeafe', padding: '16px 28px', margin: '0 0 28px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '16px', color: '#0070f3', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 1px 4px #e3e3e3' }}>Customer Dashboard</span>
          <span style={{ fontSize: '22px', color: '#222', fontWeight: 'bold', marginLeft: '10px', textShadow: '0 2px 8px #e3e3e3' }}>Penny Debt</span>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: '14px', boxShadow: '0 2px 12px #dbeafe', padding: '18px', margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
        <h2 style={{ color: '#0070f3', fontWeight: 'bold', marginBottom: '12px', fontSize: '15px' }}>Welcome, valued customer!</h2>
        <p style={{ fontSize: '13px', color: '#333', marginBottom: '10px' }}>View your profile, track your debt relief journey, and manage your progress here.</p>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button style={{ background: 'linear-gradient(90deg,#0070f3,#4fc3f7)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #e3e3e3', fontSize: '13px' }}>View Profile</button>
          <button style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #e3e3e3', fontSize: '13px' }}>Track Progress</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

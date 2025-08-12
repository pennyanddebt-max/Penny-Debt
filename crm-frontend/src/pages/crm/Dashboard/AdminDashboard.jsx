import React from 'react';
import Sidebar from '../../../components/Sidebar';
const AdminDashboard = () => (
  <div style={{ display: 'flex', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
    <Sidebar />
    <main style={{ flex: 1, padding: '32px 8vw 32px 32px' }}>
      {/* Modern Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', background: 'rgba(255,255,255,0.95)', borderRadius: '16px', boxShadow: '0 4px 24px #dbeafe', padding: '18px 32px', margin: '0 0 32px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <span style={{ fontSize: '17px', color: '#0070f3', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 1px 4px #e3e3e3' }}>Admin Dashboard</span>
          <span style={{ fontSize: '26px', color: '#222', fontWeight: 'bold', marginLeft: '12px', textShadow: '0 2px 8px #e3e3e3', letterSpacing: '2px' }}>PENNY DEBT</span>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: '14px', boxShadow: '0 2px 12px #dbeafe', padding: '24px', margin: '0 auto', maxWidth: '600px', textAlign: 'center' }}>
        <h2 style={{ color: '#0070f3', fontWeight: 'bold', marginBottom: '14px', fontSize: '18px' }}>Welcome, Admin!</h2>
        <p style={{ fontSize: '15px', color: '#333', marginBottom: '12px' }}>Access platform-wide controls, manage users, monitor employee activities, and generate reports.</p>
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'center', gap: '18px' }}>
          <button style={{ background: 'linear-gradient(90deg,#0070f3,#4fc3f7)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 18px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #e3e3e3', fontSize: '15px' }}>Manage Users</button>
          <button style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 18px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px #e3e3e3', fontSize: '15px' }}>Reports</button>
        </div>
      </div>
    </main>
  </div>
);
export default AdminDashboard;

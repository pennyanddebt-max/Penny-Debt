import React from 'react';
import Sidebar from '../../../components/Sidebar';
const ManagerDashboard = () => (
  <div style={{ display: 'flex', background: '#f5faff', minHeight: '100vh' }}>
    <Sidebar />
    <main style={{ flex: 1, padding: '40px' }}>
      <h1 style={{ color: '#0070f3' }}>Manager Dashboard</h1>
      <p>Review team performance, assign leads, and oversee progress reports.</p>
    </main>
  </div>
);
export default ManagerDashboard;


import React from 'react';
import Sidebar from '../../../components/Sidebar';
const SupportDashboard = () => (
  <div style={{ display: 'flex', background: '#f5faff', minHeight: '100vh' }}>
    <Sidebar />
    <main style={{ flex: 1, padding: '40px' }}>
      <h1 style={{ color: '#0070f3' }}>Support Dashboard</h1>
      <p>Assist employees, resolve issues, and provide helpdesk support.</p>
    </main>
  </div>
);
export default SupportDashboard;

import React from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';

const CustomerDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20 }}>
        <Overview />
      </div>
    </div>
  );
};

export default CustomerDashboard;

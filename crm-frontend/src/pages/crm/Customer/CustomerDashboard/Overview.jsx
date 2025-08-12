import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{
      width: 220,
      backgroundColor: '#f0f4f8',
      padding: 20,
      height: '100vh',
    }}>
      <h3>Customer Panel</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#progress">Progress</a></li>
        <li><a href="#payments">Payments</a></li>
        <li><a href="#support">Support</a></li>
        <li><a href="#profile">Profile</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

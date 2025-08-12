import React from 'react';
import { Link } from 'react-router-dom';

const CustomerHome = () => (
  <div>
    <h2>Welcome to Penny & Debt Customer Portal</h2>
    <Link to="/customer/register">Register</Link> | <Link to="/customer/login">Login</Link> | <Link to="/customer/profile">Profile</Link>
  </div>
);

export default CustomerHome;

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/customer-auth/login', form);
      setMessage('Login successful!');
      localStorage.setItem('customerToken', res.data.token);
      if (onLogin) onLogin(res.data.customer);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default Login;

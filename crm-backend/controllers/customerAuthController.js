const db = require('../models');
const Customer = db.Customer;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// Register a new customer
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await Customer.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    
    const customer = await Customer.create({ name, email, phone, password, address });
    res.status(201).json({ 
      message: 'Registration successful', 
      customer: { id: customer.id, email: customer.email, name: customer.name } 
    });
  } catch (err) {
    console.error('Customer registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Get customer profile (protected route)
exports.getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const customer = await Customer.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!customer) return res.status(404).json({ message: 'User not found' });
    res.json(customer);
  } catch (err) {
    console.error('Get customer profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

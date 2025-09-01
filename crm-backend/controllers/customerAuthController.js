const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

// Register a new customer
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const existing = await Customer.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const customer = await Customer.create({ name, email, phone, password, address });
    res.status(201).json({ message: 'Registration successful', customer: { id: customer.id, email: customer.email } });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Login customer
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) return res.status(404).json({ message: 'User not found' });
    const valid = await customer.validPassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });
    const token = jwt.sign({ id: customer.id, role: customer.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, customer: { id: customer.id, email: customer.email, name: customer.name } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
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
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};
// Remove duplicate/legacy loginCustomer and export correct handlers
module.exports = { register: exports.register, login: exports.login, getProfile: exports.getProfile };

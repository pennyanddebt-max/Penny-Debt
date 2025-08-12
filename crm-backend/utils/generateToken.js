// Utility to generate JWT tokens
const jwt = require('jsonwebtoken');
module.exports = function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

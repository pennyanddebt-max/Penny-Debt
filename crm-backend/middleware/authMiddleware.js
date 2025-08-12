// Role-based access middleware
module.exports = (roles = []) => {
  return (req, res, next) => {
    // Example: req.user.role is set after authentication
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

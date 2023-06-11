const jwt = require('jsonwebtoken');

module.exports = authMiddleware = (req, res, next) => {
  // Get the token from the request header, query parameter, or cookie
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'sdfsdjkf347557384$^$^%^$');
    req.user = decoded.user; // Add the authenticated user's information to the request object
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
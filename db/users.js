function authMiddleware(req, res, next) {
  // Contoh autentikasi sederhana
  const token = req.headers['authorization'];
  if (token === 'your-secret-token') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
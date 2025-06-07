const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ success: false, message: 'Email dan password wajib diisi' });

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.json({ success: false, message: 'Database error' });
    if (results.length === 0) return res.json({ success: false, message: 'Email atau password salah' });

    // Sukses login
    res.json({ success: true, user: { id: results[0].id, email: results[0].email } });
  });
});

module.exports = router;
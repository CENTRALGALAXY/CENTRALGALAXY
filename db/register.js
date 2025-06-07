const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ success: false, message: 'Email dan password wajib diisi' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.json({ success: false, message: 'Database error' });
    if (results.length > 0) return res.json({ success: false, message: 'Email sudah terdaftar' });

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err2) => {
      if (err2) return res.json({ success: false, message: 'Gagal mendaftar' });
      res.json({ success: true });
    });
  });
});

module.exports = router;
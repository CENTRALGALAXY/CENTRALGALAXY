const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
  const sql = `
    SELECT 
      e.id, e.title, e.sport, e.level, e.datetime, e.location, e.quota, e.host_id, e.description,
      u.nama AS host_name
    FROM mainbareng_events e
    LEFT JOIN users u ON e.host_id = u.id
    ORDER BY e.datetime DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({success: false, message: 'DB error'});
    res.json({success: true, data: results});
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT 
      e.id, e.title, e.sport, e.level, e.datetime, e.location, e.quota, e.host_id, e.description,
      u.nama AS host_name,
      pm.name AS payment_method
    FROM mainbareng_events e
    LEFT JOIN users u ON e.host_id = u.id
    LEFT JOIN payment_methods pm ON e.payment_method_id = pm.id
    WHERE e.id = ?
    LIMIT 1
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({success: false, message: 'DB error'});
    if (!results || results.length === 0) {
      return res.status(404).json({success: false, message: 'Event tidak ditemukan'});
    }
    res.json({success: true, data: results[0]});
  });
});

module.exports = router;
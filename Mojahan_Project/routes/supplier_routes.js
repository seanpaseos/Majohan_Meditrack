const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_paseos'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM supplier';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching supplier data:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const { supplier_name, contact, location } = req.body;

  if (!supplier_name || !contact || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO supplier (supplier_name, contact, location) VALUES (?, ?, ?)';

  db.query(sql, [supplier_name, contact, location], (err, result) => {
    if (err) {
      console.error('Error adding supplier:', err);
      res.status(500).json({ message: 'Failed to add supplier' });
    } else {
      res.status(201).json({ message: 'Supplier added successfully', supplier_ID: result.insertId });
    }
  });
});

router.put('/:id', (req, res) => {
  const { supplier_name, contact, location } = req.body;

  if (!supplier_name || !contact || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE supplier SET supplier_name = ?, contact = ?, location = ? WHERE supplier_ID = ?';

  db.query(sql, [supplier_name, contact, location, req.params.id], (err, results) => {
    if (err) {
      console.error('Error updating supplier:', err);
      res.status(500).json({ message: 'Failed to update supplier' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Supplier not found' });
    } else {
      res.json({ message: 'Supplier updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM supplier WHERE supplier_ID = ?';

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error deleting supplier:', err);
      res.status(500).json({ message: 'Failed to delete supplier' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Supplier not found' });
    } else {
      res.json({ message: 'Supplier deleted successfully' });
    }
  });
});

module.exports = router;

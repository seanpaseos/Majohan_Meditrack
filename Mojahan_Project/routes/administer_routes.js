const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_paseos'
});

// GET route to fetch all administer records
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM administer';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching administer records:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// POST route to add a new administer record
router.post('/', (req, res) => {
  console.log('Adding administer record:', req.body);
  const { doctor_ID, date, assistant_ID, patient_ID, total_cost } = req.body;
  const sql = 'INSERT INTO administer (doctor_ID, date, assistant_ID, patient_ID, total_cost) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [doctor_ID, date, assistant_ID, patient_ID, total_cost], (err) => {
    if (err) {
      console.error('Error adding administer record:', err);
      res.status(500).json({ message: 'Failed to add administer record' });
    } else {
      res.status(201).json({ message: 'Administer record added successfully' });
    }
  });
});

// PUT route to update an existing administer record
router.put('/:id', (req, res) => {
  const { doctor_ID, date, assistant_ID, patient_ID, total_cost } = req.body;
  const sql = 'UPDATE administer SET doctor_ID = ?, date = ?, assistant_ID = ?, patient_ID = ?, total_cost = ? WHERE Administer_ID = ?';

  db.query(sql, [doctor_ID, date, assistant_ID, patient_ID, total_cost, req.params.id], (err) => {
    if (err) {
      console.error('Error updating administer record:', err);
      res.status(500).json({ message: 'Failed to update administer record' });
    } else {
      res.json({ message: 'Administer record updated successfully' });
    }
  });
});

// DELETE route to delete an administer record
router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM administer WHERE Administer_ID = ?';

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error('Error deleting administer record:', err);
      res.status(500).json({ message: 'Failed to delete administer record' });
    } else {
      res.json({ message: 'Administer record deleted successfully' });
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_paseos'
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM patient';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patient data:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  console.log('Adding patient:', req.body);
  const { PatientName, VaccineName, Quantity, PurchaseDate } = req.body;
  const sql = 'INSERT INTO patient (PatientName, VaccineName, Quantity, PurchaseDate) VALUES (?, ?, ?, ?)';

  db.query(sql, [PatientName, VaccineName, Quantity, PurchaseDate], (err) => {
    if (err) {
      console.error('Error adding patient:', err);
      res.status(500).json({ message: 'Failed to add patient' });
    } else {
      res.status(201).json({ message: 'Patient record added successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { PatientName, VaccineName, Quantity, PurchaseDate } = req.body;
  const sql = 'UPDATE patient SET PatientName = ?, VaccineName = ?, Quantity = ?, PurchaseDate = ? WHERE patient_ID = ?';

  db.query(sql, [PatientName, VaccineName, Quantity, PurchaseDate, req.params.id], (err) => {
    if (err) {
      console.error('Error updating patient:', err);
      res.status(500).json({ message: 'Failed to update patient' });
    } else {
      res.json({ message: 'Patient updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM patient WHERE patient_ID = ?';

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error('Error deleting patient:', err);
      res.status(500).json({ message: 'Failed to delete patient' });
    } else {
      res.json({ message: 'Patient deleted successfully' });
    }
  });
});



module.exports = router;

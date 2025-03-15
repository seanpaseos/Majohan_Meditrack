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
  const sql = 'SELECT * FROM vaccine';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching vaccine data:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

router.post('/', (req, res) => {
  const { VaccineName, OpeningStock, Purchased, Dispensed, OrderDate, ExpirationDate } = req.body;

  if (!VaccineName || OpeningStock == null || Purchased == null || Dispensed == null || !OrderDate || !ExpirationDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const totalStock = Number(OpeningStock) + Number(Purchased);
  const closingStock = totalStock - Number(Dispensed);

  const sql = `
    INSERT INTO vaccine (vaccine_name, opening_stock, purchased, total_stock, dispensed, closing_stock, order_date, expiration_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [VaccineName, OpeningStock, Purchased, totalStock, Dispensed, closingStock, OrderDate, ExpirationDate], (err) => {
    if (err) {
      console.error('Error adding vaccine:', err);
      res.status(500).json({ message: 'Failed to add vaccine' });
    } else {
      res.status(201).json({ message: 'Vaccine record added successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
  const { vaccine_name, opening_stock, purchased, dispensed, order_date } = req.body;

  if (!vaccine_name || opening_stock == null || purchased == null || dispensed == null || !order_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const total_stock = Number(opening_stock) + Number(purchased);
  const closing_stock = total_stock - Number(dispensed);

  const sql = 'UPDATE vaccine SET vaccine_name = ?, opening_stock = ?, purchased = ?, total_stock = ?, dispensed = ?, closing_stock = ?, order_date = ? WHERE vaccine_ID = ?';

  db.query(sql, [vaccine_name, opening_stock, purchased, total_stock, dispensed, closing_stock, order_date, req.params.id], (err, results) => {
    if (err) {
      console.error('Error updating vaccine:', err);
      res.status(500).json({ message: 'Failed to update vaccine' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vaccine not found' });
    } else {
      res.json({ message: 'Vaccine updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM vaccine WHERE vaccine_ID = ?';

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error('Error deleting vaccine:', err);
      res.status(500).json({ message: 'Failed to delete vaccine' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vaccine not found' });
    } else {
      res.json({ message: 'Vaccine deleted successfully' });
    }
  });
});

module.exports = router;

/* eslint-env node */
/* global process */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Expect env: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'testdb',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/api/health', (req,res)=>res.json({ status: 'ok'}));

app.get('/api/employees', async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT id, first_name, last_name, email FROM Employees ORDER BY id DESC');
    res.json(rows);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch employees'});
  }
});

app.post('/api/employees', async (req,res) => {
  const { first_name, last_name, email } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Employees (first_name, last_name, email) VALUES (?,?,?)', [first_name, last_name, email]);
    res.status(201).json({ id: result.insertId, first_name, last_name, email });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to create employee'});
  }
});

app.put('/api/employees/:id', async (req,res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;
  try {
    await pool.query('UPDATE Employees SET first_name=?, last_name=?, email=? WHERE id=?', [first_name, last_name, email, id]);
    res.json({ id: Number(id), first_name, last_name, email });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to update employee'});
  }
});

app.delete('/api/employees/:id', async (req,res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Employees WHERE id=?', [id]);
    res.status(204).end();
  } catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to delete employee'});
  }
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));

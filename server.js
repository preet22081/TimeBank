const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();

console.log('🟢 server.js is starting...');


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Vp@232930',
  database: 'timebank',
});


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('📥 Register incoming:', { name, email, password });

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('🔥 Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (rows.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

app.listen(5000, () => {
  console.log('🚀 Backend running at http://localhost:5000');
});

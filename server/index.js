const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middlewares
app.use(express.json()); // access data from client side
app.use(cors()); // backend can interact with frontend

// Routes //
// Register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// User table route
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * from users');

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

app.listen(5000, () => {
  console.log(`server is running on PORT: 5000`);
});

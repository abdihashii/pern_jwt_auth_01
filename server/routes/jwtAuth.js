// Libraries
const router = require('express').Router();
const bcrypt = require('bcrypt');

// DB
const pool = require('../db');

// Utils
const jwtGenerator = require('../utils/jwtGenerator');

// Middleware
const validInfo = require('../middleware/validInfo');
const authorized = require('../middleware/authorized');

// Register route
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body to get the name, email, and password
    const { name, email, password } = req.body;

    // 2. check if the user exists (throw error if they exits)
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exists!'); // 401 unauthenticated error status
    }

    // 3. encrypt the user's password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user and the hashed password to the database
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *;',
      [name, email, hashedPassword]
    );

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Server Error');
  }
});

// Login route
router.post('/login', validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body
    const { email, password } = req.body;

    // 2. check if the user doesn't exist, if not, then throw error
    const user = await pool.query('SELECT * from users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json('Email is incorrect!');
    }

    // 3. check if incoming password is the same as the db password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json('Password is incorrect!');
    }

    // 4. give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Server Error');
  }
});

router.get('/isVerified', authorized, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Server Error');
  }
});

module.exports = router;

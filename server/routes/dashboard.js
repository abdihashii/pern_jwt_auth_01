// Libraries
const router = require('express').Router();

// DB
const pool = require('../db');

// Utils
const jwtGenerator = require('../utils/jwtGenerator');

// Middleware
const authorized = require('../middleware/authorized');

router.get('/', authorized, async (req, res) => {
  try {
    // 1. get the user uuid from the authorized middleware if and only if the jwt token is verified
    const user = await pool.query(
      'SELECT user_name, user_email FROM users WHERE user_id = $1',
      [req.user]
    );

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;

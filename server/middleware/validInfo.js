const jwt = require('jsonwebtoken');
require('dotenv').config();

/* Middleware to determine the request is a valid input */
module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      // check if all values are non-empty
      return res
        .status(401)
        .json('There are missing credentials, please enter all fields');
    } else if (!validEmail(email)) {
      // check if email is a valid email string
      return res.status(401).json({ message: 'Please enter a valid email' });
    }
  } else if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      // check if all values are non-empty
      return res
        .status(401)
        .json({
          message: 'There are missing credentials, please enter all fields',
        });
    } else if (!validEmail(email)) {
      // check if email is a valid email string
      return res.status(401).json({ message: 'Please enter a valid email' });
    }
  }

  next();
};

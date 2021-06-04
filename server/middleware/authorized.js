const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  // 1. destructure the req to get the token
  const {
    headers: { token },
  } = req;

  // 2. if they don't have a token, then we throw an error
  if (token === null) {
    return res.status(403).json({ message: 'Not authorized! Please log in' }); // 403 status error is for unauthorized users
  }

  try {
    // 3. check if the jwt token is valid
    const payload = jwt.verify(token, process.env.jwtSecret);

    // 4. if the token is valid, then we set the req user to the payload, so the routes using this middleware have access to it
    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Token is not valid!' }); // 403 status error is for unauthorized users
  }
};

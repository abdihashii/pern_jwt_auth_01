// This file helps connect the server to the DB
const Pool = require('pg').Pool; // allows the configuration of the connection

//  Configuring the connection
const pool = new Pool({
  user: 'postgres',
  password: 'Dadi=28278',
  host: 'localhost',
  port: 5432,
  database: 'jwttutorial',
});

module.exports = pool;

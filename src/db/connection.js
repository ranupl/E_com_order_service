const mysql = require('mysql2');
const dotenv = require("dotenv").config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0
});

console.log('Database connection pool created.');

module.exports = db;

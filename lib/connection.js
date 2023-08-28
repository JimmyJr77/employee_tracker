// This file will establish a connection to MySQL database using the mysql2 package 
// and export the connection object so that it can be used in other parts of the application.

const mysql = require('mysql2');
require('dotenv').config();


// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'management_db',
});

connection.connect(function(err) {
  if (err) throw err;
})

module.exports = connection;

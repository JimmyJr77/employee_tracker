// This file will establish a connection to your MySQL database using the mysql2 package 
// and export the connection object so that it can be used in other parts of the application.

const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '789632145',
  database: 'management_db',
});

connection.connect(function(err) {
  if (err) throw err;
})

module.exports = connection;

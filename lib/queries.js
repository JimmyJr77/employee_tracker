// This file will contain functions to perform specific SQL queries to the database, 
// such as selecting all departments, roles, employees, adding new records, updating records, and so on.

const connection = require('./connection'); 

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllDepartments () {
    return this.connection.promise().query('SELECT * FROM department;');
  }

  viewAllRoles () {
    return this.connection.promise().query('SELECT * FROM role;');
  }

  viewAllEmployees () {
    return this.connection.promise().query('SELECT * FROM employee;');
  }

}

// Export the functions to be used in other modules
module.exports = new DB(connection);

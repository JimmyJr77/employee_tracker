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
    return this.connection.promise().query(`
      SELECT 
        role.title AS job_title,
        role.id AS role_id,
        department.name AS department,
        role.salary 
      FROM role
      LEFT JOIN department ON role.department_id = department.id
    `);
  }

  viewAllEmployees() {
    return this.connection.promise().query(`
      SELECT
        employee.id AS employee_id,
        employee.first_name,
        employee.last_name,
        role.title AS job_title,
        department.name AS department,
        role.salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
  }

}

// Export the functions to be used in other modules
module.exports = new DB(connection);

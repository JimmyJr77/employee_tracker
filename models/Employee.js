// This file will define JavaScript classes for Employee entities
// Each class will have methods to interact with the database, 
// such as fetching data, inserting new records, updating records, and deleting records.

class Employee {
    constructor(connection) {
        this.connection = connection;
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

    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query(`
          INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)
        `, [firstName, lastName, roleId, managerId]);
      }

    updateEmployeeRole(selectedEmployeeId, newRoleId) {
        console.log("updatedEmployeeRole is getting the following passed through it: " + selectedEmployeeId + "," + newRoleId);
        return this.connection.promise().query(`
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `, [selectedEmployeeId, newRoleId]);
    }
};

  module.exports = Employee;
  
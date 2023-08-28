// Create a class for Employees
class Employee {
    constructor(connection) {
        this.connection = connection;
    }
  
    // Function to view all employees
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

    // Function to add employees
    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query(`
          INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)
        `, [firstName, lastName, roleId, managerId]);
      }

    // Function to update employees with a new role
    updateEmployeeRole(newRoleId, selectedEmployeeId) {
        console.log("updatedEmployeeRole is getting the following passed through it: " + newRoleId + "," + selectedEmployeeId );
        return this.connection.promise().query(`
            UPDATE employee
            SET role_id = ?
            WHERE id = ?
        `, [newRoleId, selectedEmployeeId]);
    }
};

// Export employee module
module.exports = Employee;
  
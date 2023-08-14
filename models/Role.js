// This file will define Role classes for Department entities
// Each class will have methods to interact with the database, 
// such as fetching data, inserting new records, updating records, and deleting records.

class Role {
    constructor(connection) {
        this.connection = connection;
    }
  
    listRoles() {
        return this.connection.promise().query('SELECT * FROM role;');
    }

    viewAllRoles() {
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

    addRole(newRoleName, newRoleSalary, newRoleDept) {
        return this.connection.promise().query(`
            INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)
            `, [newRoleName, newRoleSalary, newRoleDept]);
      }
}
  
  module.exports = Role;
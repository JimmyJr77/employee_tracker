// Create a class for Roles
class Role {
    constructor(connection) {
        this.connection = connection;
    }

    // Depricated function to list Roles - doesn't include some required information.
    listRoles() {
        return this.connection.promise().query('SELECT * FROM role;');
    }

    // Function to view all Roles
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

    // Function to add a Role
    addRole(newRoleName, newRoleSalary, newRoleDept) {
        return this.connection.promise().query(`
            INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)
            `, [newRoleName, newRoleSalary, newRoleDept]);
      }
}
  
  module.exports = Role;
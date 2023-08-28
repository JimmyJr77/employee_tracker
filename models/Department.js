// Create a class for Department
class Department {
    constructor(connection) {
        this.connection = connection;
    }
    
    // Function to view all departments
    viewAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department;');
    }
  
    // function to add a department
    addDepartment(newDeptName) {
        return this.connection.promise().query(`
            INSERT INTO department (name)
            VALUES (?)
            `, [newDeptName]);
    }
}
  
// export departments
module.exports = Department;
  
// This file will define JavaScript classes for Department entities
// Each class will have methods to interact with the database, 
// such as fetching data, inserting new records, updating records, and deleting records.

class Department {
    constructor(connection) {
        this.connection = connection;
    }
  
    viewAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department;');
    }
  
    addDepartment(newDeptName) {
        return this.connection.promise().query(`
            INSERT INTO department (name)
            VALUES (?)
            `, [newDeptName]);
    }
}
  
  module.exports = Department;
  
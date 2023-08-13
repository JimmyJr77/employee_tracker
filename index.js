// This is the entry point of the application. 
// It will handle the command-line interface using the inquirer package and 
// call the appropriate functions from the models and queries files based on the user's input.

const inquirer = require('inquirer');
require('console.table');
const connection = require('./lib/connection');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');

const departmentModel = new Department(connection);
const roleModel = new Role(connection);
const employeeModel = new Employee(connection);

// Function to display the main menu
function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Exit'
      ],
    },
    {
      type: 'input',
      name: 'new_department',
      message: 'What is the name of the department you would like to add?',
      when: (answers) => answers.action === 'Add a department'
    },
    {
      type: 'input',
      name: 'new_role',
      message: 'What is the name of the role you would like to add?',
      when: (answers) => answers.action === 'Add a role'
    },
    {
      type: 'input',
      name: 'new_role_salary',
      message: 'What is the salary for this new role?',
      when: (answers) => answers.action === 'Add a role'
    },
    {
      type: 'list',
      name: 'new_role_department',
      message: 'What department does this role belong to?',
      when: (answers) => answers.action === 'Add a role',
      choices: () => {
        return departmentModel.viewAllDepartments()
          .then(([departments]) => {
            return departments.map(dept => ({ name: dept.name, value: dept.id }));
          })
          .catch(error => {
            console.error('Error fetching departments:', error);
            return [];
          });
      }
    }
  ]).then((answer) => {
    if (answer.action === 'View all departments') {
      viewDepartmentsOption();
    } else if (answer.action === 'View all roles') {
      viewRolesOption();
    } else if (answer.action === 'View all employees') {
      viewEmployeesOption();
    } else if (answer.action === 'Add a department') {
      addDepartmentOption(answer.new_department); // passing the new department name
    } else if (answer.action === 'Add a role') {
      addRoleOption(answer.new_role, answer.new_role_salary, answer.new_role_department); // passing the new role name
    } else if (answer.action === 'Exit') {
      console.log('Goodbye!');
      process.exit(0);
    } else {
      console.log('Invalid choice. Please try again.');
      mainMenu();
    }
  });
}

function viewDepartmentsOption() {
  departmentModel.viewAllDepartments()
    .then(([departments]) => {
      console.log("\n");
      console.table(departments);
      mainMenu();
    })
    .catch(error => {
      console.error('Error fetching departments:', error);
      mainMenu();
    });
}

function viewRolesOption() {
  roleModel.viewAllRoles()
    .then(([roles]) => {
      console.log("\n");
      console.table(roles);
      mainMenu();
    })
    .catch(error => {
      console.error('Error fetching roles:', error);
      mainMenu();
    });
}

function viewEmployeesOption() {
  employeeModel.viewAllEmployees()
    .then(([employees]) => {
      console.log("\n");
      console.table(employees);
      mainMenu();
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
      mainMenu();
    });
}

function addDepartmentOption(newDeptName) {
  departmentModel.addDepartment(newDeptName)
    .then(() => {
      console.log(`${newDeptName} has been added to Departments`);
      mainMenu();
    })
    .catch(error => {
      console.error('Error adding department:', error);
      mainMenu();
    });
}

function addRoleOption(newRoleName, newRoleSalary, newRoleDept) {
  roleModel.addRole(newRoleName, newRoleSalary, newRoleDept)
    .then(() => {
      console.log(`${newRoleName} has been added to Roles`);
      mainMenu();
    })
    .catch(error => {
      console.error('Error adding role:', error);
      mainMenu();
    });
}

// Start the application
mainMenu();

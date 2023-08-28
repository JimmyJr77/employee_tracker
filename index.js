// This is the entry point of the application. 
// It will handle the command-line interface using the inquirer package and 
// call the appropriate functions from the models and queries files based on the user's input.

const inquirer = require('inquirer');
require('console.table');
const connection = require('./lib/connection');
const Department = require('./models/Department');
const Role = require('./models/Role');
const Employee = require('./models/Employee');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');

const departmentModel = new Department(connection);
const roleModel = new Role(connection);
const employeeModel = new Employee(connection);

// Function to initiate question prompts starting with the main menu
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
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    },
    // Follow on questions based on main menu
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
    },
    {
      type: 'input',
      name: 'new_employee_first_name',
      message: "Enter the employee's first name:",
      when: (answers) => answers.action === 'Add an employee'
    },
    {
      type: 'input',
      name: 'new_employee_last_name',
      message: "Enter the employee's last name:",
      when: (answers) => answers.action === 'Add an employee'
    },
    {
      type: 'list',
      name: 'new_employee_role',
      message: "Select the employee's role:",
      when: (answers) => answers.action === 'Add an employee',
      choices: () => {
        return roleModel.listRoles()
          .then(([roles]) => {
            return roles.map(role => ({ name: role.title, value: role.id }));
          })
          .catch(error => {
            console.error('Error fetching roles:', error);
            return [];
          });
      }
    },
    {
      type: 'list',
      name: 'new_employee_manager',
      message: "Select the employee's manager:",
      when: (answers) => answers.action === 'Add an employee',
      choices: () => {
        return employeeModel.viewAllEmployees()
          .then(([employees]) => {
            return employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.employee_id }));
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
            return [];
          });
      }
    },
    {
      type: 'list',
      name: 'update_employee',
      message: 'Select an employee to update their role:',
      when: (answers) => answers.action === 'Update an employee role',
      choices: () => {
        return employeeModel.viewAllEmployees()
          .then(([employees]) => {
            const choices = employees.map(employee => {
              // console.log(`Employee: ${employee.first_name} ${employee.last_name}, ID: ${employee.employee_id}`);
              return { name: `${employee.first_name} ${employee.last_name}`, value: employee.employee_id };
            });
            return choices;
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
            return [];
          });
      }
    },
    {
      type: 'list',
      name: 'new_role',
      message: 'Select the new role for the employee:',
      when: (answers) => answers.action === 'Update an employee role',
      choices: () => {
        return roleModel.listRoles()
          .then(([roles]) => {
            return roles.map(role => ({ name: role.title, value: role.id }));
          })
          .catch(error => {
            console.error('Error fetching roles:', error);
            return [];
          });
      }
    }
  // Pass answers through required functions
  ]).then((answers) => {
    if (answers.action === 'View all departments') {
      viewDepartmentsOption();
    } else if (answers.action === 'View all roles') {
      viewRolesOption();
    } else if (answers.action === 'View all employees') {
      viewEmployeesOption();
    } else if (answers.action === 'Add a department') {
      addDepartmentOption(answers.new_department);
      console.log("Department added: " + answers.new_department)
    } else if (answers.action === 'Add a role') {
      addRoleOption(answers.new_role, answers.new_role_salary, answers.new_role_department);
      console.log("Role added: " + answers.new_role)
    } else if (answers.action === 'Add an employee') {
      addEmployeeOption(answers.new_employee_first_name, answers.new_employee_last_name, answers.new_employee_role, answers.new_employee_manager);
      console.log("Employee manager added: " + answers.new_employee_manager)
    } else if (answers.action === 'Update an employee role') {
      updateEmployeeRoleOption(answers.new_role, answers.update_employee);
      console.log(answers.update_employee);
      console.log(answers.new_role);
    } else if (answers.action === 'Exit') {
      console.log('Goodbye!');
      process.exit(0);
    } else {
      console.log('Invalid choice. Please try again.');
      mainMenu();
    }
  });
}

// Function to call the department model function
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

// Function to call the role model function
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

// Function to call the employees model function
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

// Function to call the department model function and add a department
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
// Function to call the role model function and add a role
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

// Function to call the employee model function and add an employee
function addEmployeeOption(firstName, lastName, roleId, managerId) {
  employeeModel.addEmployee(firstName, lastName, roleId, managerId)
    .then(() => {
      console.log(`${firstName} ${lastName} has been added as an employee`);
      mainMenu();
    })
    .catch(error => {
      console.error('Error adding employee:', error);
      mainMenu();
    });
}

// Function to call the employee model function and update employees roles
function updateEmployeeRoleOption(newRoleId, selectedEmployeeId) {
  employeeModel.updateEmployeeRole(newRoleId, selectedEmployeeId)
    .then(() => {
      console.log('Employee role updated successfully');
      mainMenu();
    })
    .catch(error => {
      console.error('Error updating employee role:', error);
      mainMenu();
    });
}



// Start the application
mainMenu();

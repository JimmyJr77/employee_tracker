// This is the entry point of the application. 
// It will handle the command-line interface using the inquirer package and 
// call the appropriate functions from the models and queries files based on the user's input.

const inquirer = require('inquirer');
require('console.table')
const queries = require('./lib/queries');

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
        'Exit'
      ],
    }
  ]).then((answer) => {
    if (answer.action === 'View all departments') {
      seeDeptartments()
    } else if (answer.action === 'View all roles') {
      seeRoles();
    } else if (answer.action === 'View all employees') {
      seeEmployees();
    } else if (answer.action === 'Exit') {
      console.log('Goodbye!');
      process.exit(0);
    } else {
      console.log('Invalid choice. Please try again.');
      mainMenu();
    }
  });
}

function seeDeptartments() {
  queries.viewAllDepartments()
    .then(([dept]) => {
      console.log("\n");
      console.table(dept);
      mainMenu();
    })
}

function seeRoles() {
  queries.viewAllRoles()
    .then(([dept]) => {
      console.log("\n");
      console.table(dept);
      mainMenu();
    })
}

function seeEmployees() {
  queries.viewAllEmployees()
    .then(([dept]) => {
      console.log("\n");
      console.table(dept);
      mainMenu();
    })
}

// Start the application
mainMenu();

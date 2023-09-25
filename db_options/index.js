// require database in server.js
const db = require('../server');
// import and require inquirer
const inquirer = require('inquirer');
// require db option files
//const employee = require()

// set questions for user using prompt
const promptUser = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choices',
        choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department'
        ]
      }
    ])
    .then((answers) => {
      const { choices } = answers;

      if (choices === 'View All Employees') {
        viewEmployees();
      }
      if (choices === 'Add Employee') {
        addEmployees();
      }
      // if (choices === 'Update Employee Role') {

      // }
      if (choices === 'View All Roles') {
        viewRoles();
      }
      if (choices === 'Add Role') {
        addRoles();
      }
      if (choices === 'View All Departments') {
        viewDepts();
      }
    })
}

promptUser();


// view employees function
const viewEmployees = () => {
  let viewEmployees = 'SELECT * FROM employee'
  db.query(viewEmployees, (err, results) => {
    if (err) {
      throw err
    } else {
      console.log('------------------------------------------------------------------');
      console.log('List of Employees:');
      console.table(results);
      promptUser();
    }
  })
};

// add employees function
const addEmployees = () => {
  // query db to get list of roles
  const viewRolesQuery = 'SELECT * FROM role';

  db.query(viewRolesQuery, (err, roleResults) => {
    if (err) {
      throw err
    } else {
      // get role titles from query results
      const rolesArray = roleResults.map(role => role.title);

       // query db to get list of managers
       // get manager ids ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      const viewManagersQuery = 'SELECT * FROM employee';

      db.query(viewManagersQuery, (err, managerResults) => {
        if (err) {
          throw err
        } else {
          const managerArray = managerResults.map(employee => employee.first_name);
          
          inquirer
          .prompt([
            { // first name
              type: 'input',
              name: 'firstName',
              message: 'Please enter the first name of the employee.',
              validate: firstName => {
                if (firstName) {
                  return true;
                } else {
                  console.log('Please enter a valid first name.');
                  return false;
                }
              }
            }, { // last name
              type: 'input',
              name: 'lastName',
              message: 'Please enter the last name of the employee.',
              validate: lastName => {
                if (lastName) {
                  return true;
                } else {
                  console.log('Please enter a valid last name.');
                  return false;
                }
              }
            }, { // role
              type: 'list',
              name: 'roles',
              message: "Please select the employee's role.",
              choices: rolesArray
            }, { // manager
              type: 'list',
              name: 'manager',
              message: "Please select the employee's manager.",
              choices: managerArray
            }
          ])
          .then((answers) => {
            // insert employee data into db
            const { firstName, lastName, role, manager } = answers;
            const insertEmployeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
            const roleID = roleResults.find(result => result.title === role).id; 
            const managerID = managerResults.find(result => result.manager_id === manager).id; 
            const values = [firstName, lastName, roleID, managerID];
            
            db.query(insertEmployeeQuery, values, (err, insertResult) => {
              if (err) {
                throw err;
              } else {
                console.log(`Employee ${firstName} ${lastName} added successfully!`);
                promptUser();
              }
            });
          });
        }
      })
        }
      });
};
// test to see what results we get
// const test = () => {
//     db.query('SELECT * FROM role', (err, results) => {
//       console.log(results);
//   })
// }
// test();

// update employee role function

// view roles function
const viewRoles = () => {
    let viewRoles = 'SELECT * FROM role'
    db.query(viewRoles, (err, results) => {
      if (err) {
        throw err
      } else {
        console.log('------------------------------------------------------------------');
        console.log('List of Roles:');
        console.table(results);
        promptUser();
      }
    })
  };

  // add roles function
const addRoles = () => {
  // query db to get list of departments
  const viewDeptsQuery = 'SELECT * FROM department';

  db.query(viewDeptsQuery, (err, deptResults) => {
    if (err) {
      throw err
    } else {
      // get department titles from query results
      const deptArray = deptResults.map(department => department.name);

      inquirer
        .prompt([
          { // role name
            type: 'input',
            name: 'roleName',
            message: 'Please enter the name of the role.',
            validate: roleName => {
              if (roleName) {
                return true;
              } else {
                console.log('Please enter a valid role name.');
                return false;
              }
            }
          }, { // salary
            type: 'input',
            name: 'salary',
            message: 'Please enter the salary for this role.',
            validate: salary => {
              if (salary) {
                return true;
              } else {
                console.log('Please enter a valid salary.');
                return false;
              }
            }
          }, { // department
            type: 'list',
            name: 'dept',
            message: "Please select the department for this role.",
            choices: deptArray
          }
        ])
        .then((answers) => {
          // insert role data into db
          const { roleName, salary, dept } = answers;
          const insertRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)';
          const deptID = deptResults.find(result => result.name === dept).id;
          const values = [roleName, salary, deptID];

          db.query(insertRoleQuery, values, (err, insertResult) => {
            if (err) {
              throw err;
            } else {
              console.log(`Role of ${roleName} added successfully!`);
              console.log('------------------------------------------------------------------');
              promptUser();
            }
          });
        });
    }
  });
};

  // view departments function
  const viewDepts = () => {
    let viewDepts = 'SELECT * FROM department'
    db.query(viewDepts, (err, results) => {
      if ((err)) {
        throw err
      } else {
        console.log('------------------------------------------------------------------');
        console.log('List of Departments:');
        console.table(results);
        promptUser();
      }
    })
  };

// add departments function
// const addDepartment = () => {
//   inquirer
//   .prompt([
//     { // role name
//       type: 'input',
//       name: 'deptName',
//       message: 'Please enter the name of the department.',
//       validate: deptName => {
//         if (deptName) {
//           return true;
//         } else {
//           console.log('Please enter a valid department name.');
//           return false;
//         }
//       }
//     }
//   ]
// }






// connect to database so you can pull and display table info
// write to database tables when adding or updating info

//pseudocode from james

// Prompt Inquirer to prompt User "What would you like to do?"
// View all Departments
// View all Roles
// View all Employees

// Add a Department
// Ask for name

// Add Role and input ROLE name
// Which department does said role belong to?

// Add a Role

// Add an employee
// Ask for First and Last name
// Role?
// Manager?
// Add static salary for each role.

// Update an employee Role when chosen display - Which employees role do you want to update? which will display all employees.
// Ask Which role do you want to assign - display ROLES
// back to main WHAT WOULD YOU LIKE TO DO?

// When user selects option to VIEW - Display that table
// User still has control of PROMPT

// CREATE A FUNCTION for each option
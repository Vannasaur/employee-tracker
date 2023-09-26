// require database in server.js
const db = require('../server');
// import and require inquirer
const inquirer = require('inquirer');
// prompt user
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
      if (choices === 'Update Employee Role') {
        updateEmployeeRole();
      }
      if (choices === 'View All Roles') {
        viewRoles();
      }
      if (choices === 'Add Role') {
        addRoles();
      }
      if (choices === 'View All Departments') {
        viewDepts();
      }
      if (choices === 'Add Department') {
        addDepartment();
      }
    })
}

promptUser();


// view employees function
const viewEmployees = () => {
  let viewEmployees = `SELECT 
  employee.id AS ID, 
  employee.first_name AS First_Name, 
  employee.last_name AS Last_Name, 
  role.title AS Job_Title, 
  department.name AS Department_Name, 
  role.salary AS Salary, 
  CONCAT(manager.first_name, " ", manager.last_name) AS Manager_Name
  FROM 
  employee 
  JOIN role ON role.id = employee.role_id
  JOIN department ON department.id = role.department_id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
  db.query(viewEmployees, (err, results) => {
    if (err) {
      throw err
    } else {
      console.log('------------------------------------------------------------------');
      console.log('\n');
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
      const viewManagersQuery = 'SELECT * FROM employee';

      db.query(viewManagersQuery, (err, managerResults) => {
        if (err) {
          throw err
        } else {
          const managerArray = managerResults.map(employee => employee.first_name);
          // prompt user questions for adding employee
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
                name: 'role',
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
              // look through roleResults array to find a role that matches the user selected role, then extract that id
              const roleID = roleResults.find(result => result.title === role).id;
              // look through managerResults array to find a manager that matches the user selected manager, then extract that id
              const managerID = managerResults.find(result => result.first_name === manager).id;
              const values = [firstName, lastName, roleID, managerID];

              db.query(insertEmployeeQuery, values, (err, insertResult) => {
                if (err) {
                  throw err;
                } else {
                  console.log('\n');
                  console.log(`Employee ${firstName} ${lastName} added successfully!`);
                  viewEmployees();
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
const updateEmployeeRole = () => {
  // query db to get list of employee names
  const viewEmployeesQuery = `SELECT
  CONCAT(employee.first_name, " ", employee.last_name) 
  AS employee_name FROM employee`;

  db.query(viewEmployeesQuery, (err, employeeResults) => {
    if (err) {
      throw err
    } else {
      const employeeArray = employeeResults.map(employee => employee.employee_name);

      // query db to get list of roles
      const viewRolesQuery = 'SELECT * FROM role';

      db.query(viewRolesQuery, (err, roleResults) => {
        if (err) {
          throw err
        } else {
          const rolesArray = roleResults.map(role => role.title);
          // prompt user questions for updating employee role
          inquirer
          .prompt ([
            { // employee name
              type: 'list',
              name: 'updateEmployeeName',
              message: "Please select the employee's name.",
              choices: employeeArray
            },{ // role
              type: 'list',
              name: 'updateRole',
              message: "Please select the employee's role.",
              choices: rolesArray
            }
          ])
          .then((answers) => {
            // insert updated role data into employee db
          const { updateEmployeeName, updateRole } = answers;
          const insertUpdatedRoleQuery = 'UPDATE employee SET role_id = (SELECT id FROM role WHERE title = ?) WHERE CONCAT(first_name, " ", last_name) = ?';
          
          const values = [updateRole, updateEmployeeName];

          db.query(insertUpdatedRoleQuery, values, (err, insertUpdatedRoleResult) => {
            if (err) {
              throw err;
            } else {
              console.log('\n');
              console.log(`Role of ${updateEmployeeName} updated successfully!`);
              viewEmployees();
            }
          });
          })
        }
      })
    }
  })
};

// view roles function
const viewRoles = () => {
  let viewRoles = `SELECT 
  role.id AS ID, 
  title AS Title, 
  name AS Department_Name, 
  salary AS Salary 
  FROM role 
  JOIN department ON department.id = role.department_id`
  db.query(viewRoles, (err, results) => {
    if (err) {
      throw err
    } else {
      console.log('------------------------------------------------------------------');
      console.log('\n');
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
      // prompt user questions for adding roles
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
              console.log('\n');
              console.log(`Role of ${roleName} added successfully!`);
              viewRoles();
            }
          });
        });
    }
  });
};

// view departments function
const viewDepts = () => {
  let viewDepts = 'SELECT id AS ID, name AS Department_Name FROM department'
  db.query(viewDepts, (err, results) => {
    if ((err)) {
      throw err
    } else {
      console.log('------------------------------------------------------------------');
      console.log('\n');
      console.log('List of Departments:');
      console.table(results);
      promptUser();
    }
  })
};

//add departments function
const addDepartment = () => {
  // prompt user questions for adding department
  inquirer
    .prompt([
      { // role name
        type: 'input',
        name: 'deptName',
        message: 'Please enter the name of the department.',
        validate: deptName => {
          if (deptName) {
            return true;
          } else {
            console.log('Please enter a valid department name.');
            return false;
          }
        }
      }
    ])
    .then((answers) => {
      const { deptName } = answers;
      const insertDeptNameQuery = 'INSERT INTO department (name) VALUES (?)';
      const values = [deptName];

      db.query(insertDeptNameQuery, values, (err, insertResult) => {
        if (err) {
          throw err;
        } else {
          console.log('\n');
          console.log(`Department ${deptName} added successfully!`);
          viewDepts();
        }
      })
    })
};

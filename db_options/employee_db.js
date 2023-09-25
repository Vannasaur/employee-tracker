// // require database in server.js
// const db = require('../server');

// // require index
// const index = require('./index');

// // view all employees
// const viewEmployees = () => {

//     let viewEmployeesDB = 'SELECT * FROM employee'
//     db.query(viewEmployeesDB, (err, results) => {
//         if (err) throw err;
//         console.log('Employee List:');
//         console.table(results);
//         index.promptUser(); // WHY DOESNT THIS WORK?????? SAYS PROMPTUSER IS NOT A FUNCTION
//     })
// }
// add an employee
// update employee role
// modular.exports = { viewEmployees, addEmployee, updateEmployee }


// able to export out viewEmployees() as employee.viewEmployees() but not able to import promptUser as index.promptUser();
// why does it work one way but not the other?? I DONT UNDERSTAND 
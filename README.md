# Employee Tracker
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
## Description

This is a command-line application built to manage a company's employee database, using Node.js, Inquirer, and MySQL. This allows the user to easily view and interact with the information stored in the Blips and Chitz Database. Please see User Story and Acceptance Criteria below:

User Story: 

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

Acceptance Criteria:

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database


## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)


## Installation

Please download Git BASH at https://gitforwindows.org/ if you are a Windows user. If you are a Mac user, please pull up the terminal on your Mac by pressing Command Spacebar and searching for terminal. 

Please also install the following programs: 

     - Node.js at https://nodejs.dev/en/download/
     - Inquirer.js Version 8.2.4 at https://www.npmjs.com/package/inquirer
     - VScode at https://code.visualstudio.com/download
     - MySQL at https://dev.mysql.com/downloads/mysql/
     - mysql2 at https://www.npmjs.com/package/mysql2


## Usage

In order to use this application, open up your terminal (on Mac) or Git Bash (on Windows). CD into the folder that contains the Employee Tracker code. You will first CD into the db folder that has the sql files. Type in 'mysql -uroot' (without the single quotations) if you don't have a password for mysql and 'mysql -uroot -p' if you have a password. Once mysql is running, type in 'SOURCE schema.sql;' (without the single quotations) into the command line and then 'SOURCE seeds.sql;' (without the single quotations) into the command line. This will create your database and fill it will employee information.

While mysql is running, open another terminal and once again, CD into the folder that conatins the Employee Tracker code. CD into the sql-functionality folder and run ‘node index.js’ into your terminal (without the single quotations). You will be prompted with options to choose from. The options include viewing and adding employees, departments and roles.

## Demo

Please see a demo of my application [here](https://drive.google.com/file/d/1jpLqCreCzfTKux7VB6ohjFCcrYvUZHDz/view?usp=sharing).

Please see a demo of running the unit tests [here](https://drive.google.com/file/d/1i14kvGCTNl4D7VvQDHPBTHbkbfbwN0VS/view?usp=sharing).

## Credits

Badge for MIT License was made with [Shields.io](http://shields.io/) and taken from GitHub user: lukas-h. See below for the link to the license badge collection: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba


## License

MIT License, please refer to the LICENSE in the repo.

## Contributing

N/A

## Tests

N/A

## Questions

Please refer to my profile for additional projects: https://github.com/Vannasaur

If you have any questions please email me at: vannaluciano@gmail.com
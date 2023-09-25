// import and require mysql2
const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1', // ip address of localhost
        user: 'root',
        database: 'blips_and_chitz_db'
    },
    console.log('Connected to the Blips and Chitz database.')
);

module.exports = db;
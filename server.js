// import express
const express = require('express');
// import and require mysql2
const mysql = require('mysql2');
// define port
const PORT = process.env.PORT || 3001;
// create new instance of express
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1', // ip address of localhost
        user: 'root',
        database: 'blips_and_chitz_db'
    },
    console.log('Connected to the Blips and Chitz database.')
);

// default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// add listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
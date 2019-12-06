const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'lurang',
    database: 'node',
    password: 'wnsgh'
});

module.exports = pool.promise();


/*
const db = require ('./util/database');

db.execute('select * from customer')
    .then(result => {
        console.log(result[0], result[1]);
    })
    .catch( err => {
        console.log(err);
    });


*/
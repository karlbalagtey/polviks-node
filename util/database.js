const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'adminboom',
    database: 'polviks-node',
    password: 'Proverbs356'
});

module.exports = pool.promise();
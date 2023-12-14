const mysql = require('mysql');

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "nguyet982002",
    database: "DB_EMPLOYEE_MS"
});


module.exports = con;

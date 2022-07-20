var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'Blog',
    user: 'root',
    password: 'password'
});

module.exports = connection;
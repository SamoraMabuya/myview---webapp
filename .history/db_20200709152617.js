const mysql = require('mysql');

function getConnection() {
    var sqlDatabase = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    });

    return sqlDatabase;
}

module.exports = sqlDatabase;
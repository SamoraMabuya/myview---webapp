const LocalStrategy = require('passport-local');
const mysql = require('mysql');
const bcryptjs = require('bcryptjs');
const { authenticate } = require('passport');

const sqlDatabase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

function initiate(passport) {

    const authenticateUser = (email, password, done) => {

        sqlDatabase.query('SELECT * FROM user WHERE email=? ', [email], async(error, results) {
            if(error) {
                throw error;
            }

            console.log(results)

            if
        })
    }
    passport.use(new LocalStrategy(
        {
        email: "email",
        password: "password"

            },
            authenticateUser
    )
    );
}

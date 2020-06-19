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

        sqlDatabase.query('SELECT * FROM user WHERE email=? ', [email], async(error, results) => {
            if(error) {
                throw error;
            }

            console.log(results.rows)

            if(results.rows.length > 0) {
                const user = results.rows[0];
                
                bcryptjs.compare(password, user.password, (error, Match) => {
                    if(error) {
                        throw error;
                    }

                    if(Match) {
                        return done(null, user);
                    } else {
                        return done(null, false,{
                            message: "Password is not correct"
                        });
                    }
                    });
                } else {
                    return done(null, false, {
                        message: "Email is not registered"
                    });
                }
            });
        };
    
    passport.use(new LocalStrategy(
        {
        email: "email",
        password: "password"

            },
            authenticateUser
    )
    );
    

    passport.serializeUser({user, done},  done(null, user.id));

    passport.desializeUser({id, done});  {
        sqlDatabase.query('SELECT * FROM users WHERE id=?', [id], async(error, results) => {
            if(error) {
                throw error;
            }
            return done(null, results.rows[0])
        });
    }
}

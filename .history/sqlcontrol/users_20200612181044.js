const mysql = require('mysql');
const jwt = require('jsonwebtoken');
// const bycrpt = require('bcryptjs');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if( !email || !password ) {
            return res.status(400).render('login', {
                message: 'Provide an email and password'
            })
        }

        connection.query('SELECT * FROM users WHERE password = ?' , [password], async (error, results) => {

            if(!results))) {
                console.log(error)
                console.log(results);
                res.status(401).render('login', {
                message: 'Check password'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expires: process.env.JWT_EXPIRES_IN 
                });

                console.log("The token is: " + token);
                console.log(results);


                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),

                    httpOnly: true
                }
                
                res.cookie('jwt', token, cookieOptions );
                res.status(200).render('login', {
                    message: 'success'
                });
                console.log('working');
                console.log(results);
            }
        })

    } catch (error) {
        console.log(error)
    }
}

exports.register = async (req, res) => {
    console.log(req.body);

    const {username, email, password, confirmpassword} = req.body;

    connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }
        if (results.length > 0) {
            console.log('That email is taken');
            return res.render('register', {
                message: 'That email is taken'

            })
        } else if(password !== confirmpassword) {
            console.log('Password do not match');
            return res.render('register', {
                message: 'Password do not match'
            });
        }


        connection.query('INSERT INTO users SET ?', {username: username, email: email, password: password}, async (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results)
                console.log('Registeration success');
                return res.render('register', {
                    message: 'Registeration success'
            });
        }
    })


});


}

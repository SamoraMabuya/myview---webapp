const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


const sqlDatabase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password  = req.body.password;


        if(!email || !password) {
            return res.status(400).render('login', {
                message: "Fields cannot be empty"
            })
        }
        sqlDatabase.query('SELECT * FROM users WHERE email =?', [email],  async (error, results) => {
            if(!results || !(await bcryptjs.compare(password, results[0].password ) ) ) {
                console.log(error);
                res.status(401).render('login', {
                    message: 'Check password and email again'
                })
            }
                if(results.length > 0) {
                    console.log(error);
                    res.status(401).render('login', {
                        message: 'Check password and email again'
                    })
                    if((await bcryptjs.compare(password, results[0].password)) {
                        console.log(error);
                        res.status(401).render('login', {
                            message: 'Check password and email again'
                        })
                    }
                
                
            } else {
            
                const Id = results[0].Id;

                const token = jwt.sign({Id}, process.env.JWT_SECRET_KEY, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.register = async (req, res) => {
    console.log(req.body);

    const  {username, email, password, confirmpassword} = req.body;
    

    sqlDatabase.query('SELECT * FROM users WHERE email =?', [email], async (error, results,) => {
        if(error) {
            console.log(error);
        } else
        if(results.length > 0) {
            console.log("Account already in use");
            return res.render('register',  {
                message: 'Account already in use', 

            })
            
        } else if (password !== confirmpassword) {
            console.log('Password do not match');
            return res.render('register', { 
                message: 'Passwords do not match', 
        
            });
        } 
        sqlDatabase.query('SELECT * FROM users WHERE username =?', [username], async (error, results,) => {
            if(error) {
                console.log(error)
                return res.render('register', {
                    message: 'Try again'
            });
        }
            if(results.length > 0) {
                console.log(results)
                return res.render('register', {
                    message: 'Username is already taken',
            });
        }

        let hashedpassword = await bcryptjs.hash(password, 8);
        console.log(hashedpassword);

        sqlDatabase.query('INSERT INTO users SET ?', {username: username, email: email, password: hashedpassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('home')
            }
        })
    })
    })
}
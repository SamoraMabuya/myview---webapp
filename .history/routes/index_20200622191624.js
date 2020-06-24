const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sqlDatabase = require('../db.js');

// recieve pages from client
router.get("/", function (req, res) {
    res.render('home');
});

router.get("/register", function (req, res, next) {
    res.render('register');


});

router.get("/login", function (req, res, next) {
    res.render('login');
});

router.get("/profile",  function (req, res) {
    res.render('profile', { title: 'profile' });
});



// send pages from server

router.post("/register", function (req, res, next) {

    const sqlDatabase = require('../db.js');

    const { username, email, password, confirmpassword } = req.body;


    sqlDatabase.query('SELECT * FROM users WHERE email =?', [email], async (error, results,) => {
        if (error) {
            console.log(error);
        } else
            if (results.length > 0) {
                console.log("Account already in use");
                return res.render('register', {
                    message: 'Account already in use',

                })

            } else if (password !== confirmpassword) {
                console.log('Password do not match');
                return res.render('register', {
                    message: 'Passwords do not match',

                });
            }

        sqlDatabase.query('SELECT * FROM users WHERE username =?', [username], async (error, results,) => {
            if (error) {
                console.log(error)
                return res.render('register', {
                    message: 'Try again'
                });
            }
            if (results.length > 0) {
                console.log(results)
                return res.render('register', {
                    message: 'Username is already taken',
                });
            }

            bcrypt.hash(password, saltRounds, function (err, hash) {

                sqlDatabase.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                    [username, email, hash], function (error, results, fields) {
                        if (error) throw error;
                        res.redirect('/');
                        console.log(results);
                    })
            });
        })
    })
})


router.post("/login", function (req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;



        if (!email || !password) {
            return res.status(400).render('login', {
                message: "Fields cannot be empty"
            })
        }
        sqlDatabase.query('SELECT * FROM users WHERE email =?', [email], async (error, results) => {
            if (!results || !(await bcryptjs.compare(password, results[0].password))) {
                console.log(error);
                res.status(401).render('login', {
                    message: 'Check password and email again'
                })

            } else {

                const Id = results[0].Id;

                const token = jwt.sign({ Id }, process.env.JWT_SECRET_KEY, {
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
})
            
module.exports = router;
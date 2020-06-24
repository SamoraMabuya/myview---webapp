const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

router.get("/profile", function (req, res) {
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

            })
        })
        router.post("/login", (req, res) => {
            res.render('/')

            sqlDatabase.query('SELECT LAST_INSERT_ID() as user_id', function (error, results, fields) {
                if (error) {
                    console.log(error)
                    req.login(results[0], function (err) {
                        res.redirect('/');
                    })
                }
            })

        });
        

    });
    
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
})

// router.post('/register', usercontrol.register);
// router.post("/login", usercontrol.login)

module.exports = router;
const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
// const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');



// recieve pages from client
router.get("/", function (req, res) {
    console.log(req.user)
    console.log(req.isAuthenticated);
    res.render('home');
});

router.get("/register", function (req, res, next) {
    console.log(req.user)
    res.render('register');


});

router.get("/login", function (req, res, next) {
    res.render('login');
});

router.get("/superhero-movies", authenticationMiddleware(), function (req, res) {
    res.render('superhero-movies');
});

// send pages from server
router.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login'
}));

router.post("/register", function (req, res, next) {

    const { username, email, password, confirmpassword } = req.body;

    const sqlDatabase = require('../db.js');



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
                        // if (error) throw error;
                        // console.log(results);

                        sqlDatabase.query('SELECT LAST_INSERT_ID() as user_id', async function (error, results, fields) {
                            if (error) throw error;
                            // console.log(error);

                            const user_id = results[0];
                            console.log(user_id);

                            req.login(user_id, function (err) {
                                // res.redirect('/');
                                console.log(err);
                            })
                        })

                    });

            });

        });

        passport.serializeUser(function(user_id, done) {
            done(null, user_id);
            console.log(err);
            console.log('serialized');

        });
    });

    passport.deserializeUser(function(user_id, done, err) {
        done(null, user_id);
        console.log(err);
        console.log('deserialized');


    });
});

function authenticationMiddleware() {
    return function (req, res, next) {
        console.log(`req.session.passport.user: ${JSON.stringify(
            req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = router;
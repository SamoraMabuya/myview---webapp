const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
// const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const sqlDatabase = require('../db.js');
const { destroy } = require('../db.js');
const LocalStrategy = require('passport-local').Strategy;


var flash = require('express-flash-messages')

router.use(flash());


// recieve pages from client
router.get("/", function (req, res) {
    console.log(req.user)
    console.log(req.isAuthenticated);
    res.render('home');
    req.logout();
    res.clearCookie('connect.sid');


});

router.get("/register", function (req, res, next) {
    console.log(req.user)
    res.render('register');



});

router.get("/login", function (req, res, next) {
    res.render('login');
    
});


router.get("/logout", async function (req, res) {
        // await req.logout(),
        req.session.destroy();
        res.clearCookie('connect.sid'),
        res.redirect('/');







});


router.get("/superhero-movies", authenticationMiddleware(), function (req, res) {
    res.render('superhero-movies');
});

router.post("/login", async (req, res) => {
    passport.authenticate('local',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,

        });
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    function (req, email, password, done, res) {
        console.log(email, password, done);
        const sqlDatabase = require('../db.js');


        sqlDatabase.query('SELECT * FROM users WHERE email = ?', [email], (err, results, fields, res) => {
            if (err)
                return done(err);
            console.log(err, fields);


            if (results.length === 0) {
                res.render('login', {message: 'This is a test notification.'})
                // done(null, false, {message:'Check email and password again.'});
            } else {

                const hash = results[0].
                    password.toString();

                const id = results[0].id;


                bcrypt.compare(password, hash, function (err, response) {
                    if (response === true) {
                        return done(null, id);
                    } else {
                        res.render('login', {message: 'This is a test notification.'});

                        // console.log(err);
                        // return done(null, false, {message:'Check email and password again.'});

                    }
                })
            }

        })

    });

passport.serializeUser(function (id, done) {
    console.log(id);
    done(null, id);
    console.log(done);
    console.log('serialized');

});
passport.deserializeUser(function (id, done) {
    // sqlDatabase.query("SELECT * FROM users WHERE id = " + id, function (err, done) {
    done(null, id);
    console.log(done);
    console.log('deserialized');

});







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
                        if (error) throw error;
                        console.log(results);

                        sqlDatabase.query('SELECT LAST_INSERT_ID() as id', async function (error, results, fields, err) {
                            if (error) throw error;
                            console.log(error);

                            const id = results[0];
                            console.log(id);

                            req.login(id, function (err) {
                                res.redirect('/');
                                console.log(err, req);
                            })
                        })

                    });

            });

        });

        passport.serializeUser(function (id, done) {
            console.log(id);
            done(null, id);
            console.log(done);
            console.log('serialized');

        });
    });

    passport.deserializeUser(function (id, done) {
        // sqlDatabase.query("SELECT * FROM users WHERE id = "+ id, function (err, rows) {
        done(null, id);
        console.log(done);
        console.log('deserialized');

    })
})


function authenticationMiddleware() {
    return function (req, res, next) {
        console.log(`req.session.passport.user: ${JSON.stringify(
            req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = router;
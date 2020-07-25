const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
// const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const sqlDatabase = require('../db.js');
const LocalStrategy = require('passport-local').Strategy;


var flash = require('express-flash-messages');
const { session } = require('passport');



const { result } = require('lodash');
const { json } = require('express');
const { render } = require('ejs');
var http = require('http').createServer(express);
var io = require('socket.io')(http);


// recieve pages from client
router.get("/", function(req, res) {

    res.render('home');
    console.log(req.user + ' :is signed in')
    console.log(req.isAuthenticated());


});


router.get("/register", function(req, res, next) {
    console.log(req.user)
    res.render('register');



});

router.get("/login", function(req, res, next) {
    res.render('login');
});



router.get("/logout", async function(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/');

});

router.post("/superhero-movies", function(req, res) {
    const user = req.user;
    const { comments } = req.body;
    socket.on('new_message', function(message) {
        console.log('Client says', message);
        io.emit('new_message', message)
        const sqlDatabase = require('../db.js');




        sqlDatabase.query("INSERT INTO comments (user_id, comments) VALUES (?, ?)", [user, comments], function(error, results, fields) {
            if (error) throw error;
            console.log(results);


        });
        sqlDatabase.end();
        res.end();
    })
})
            

                        router.get("/superhero-movies", authenticationMiddleware(), function(req, res, err) {




        atabase.query("SELECT users.username, comments.comments, comments.date FROM users INNER JOIN comments ON users.user_id=comments.user_id",
            tion(error, results, fields) {
                                    if (error) throw error;

            res.status(200).render('superhero-movies', results);
            console.log(results);
                                })

                        })




router.post("/login",
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
                                // failureFlash: true,

    }));
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, email, password, done) {
        console.log(email, password, done);
                                const sqlDatabase = require('../db.js');




        sqlDatabase.query('SELECT * FROM users WHERE email = ?', [email], (err, results, fields, res) => {
            if (err)
                return done(err);
                                    console.log(err, fields, results);




                results.length === 0) {
                done(null, false, { message: 'Check email and password again.' });
                                    } else {

                const hash = results[0].
                                        password.toString();

                                        const user_id = results[0].user_id;


                    pt.compare(password, hash, function(err, response) {
                    console.log(user_id);
                        response === true) {
                        return done(null, user_id);
                       }se {
                        console.log(user_id);
                        console.log(err);
                                                return done(null, false, { message: 'This is a test notification.' });

                    }
                })
                                    }

                                })

                            }));

    port.serializeUser(function(user_id, done) {
    console.log(user_id);
    done(null, user_id);
    console.log(done);
                            console.log('serialized', user_id);

});
passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
    console.log(done);
                            console.log('deserialized', user_id);

                        });







                        router.post("/register", function(req, res, next) {

                            const { username, email, password, confirmpassword } = req.body;

                            const sqlDatabase = require('../db.js');



     sqlatabase.query('SELECT * FROM users WHERE email =?', [email], async(error, results, ) => {
        if (error) {
            console.log(error);
        } else
            results.length > 0) {
            console.log("Account already in use");
                rn res.render('register', {
                                        message: 'Account already in use',

                                    })

            se if (password !== confirmpassword) {
            console.log('Password do not match');
                rn res.render('register', {
                                        message: 'Passwords do not match',

            });
                                }

            atabase.query('SELECT * FROM users WHERE username =?', [username], async(error, results, ) => {
                error) {
                console.log(error)
                    rn res.render('register', {
                    message: 'Try again'
                });
            }
            if (results.length > 0) {
                console.log(results)
                    rn res.render('register', {
                    message: 'Username is already taken',
                });
                                    }

                pt.hash(password, saltRounds, function(err, hash) {
                    atabase.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields) {
                    if (error) throw error;
                                            console.log(results);

                        atabase.query('SELECT LAST_INSERT_ID() as id', async function(error, results, fields, err) {
                        if (error) throw error;
                                                console.log(error);

                        const user_id = results[0];
                                                console.log(user_id);

                            login(user_id, function(err) {
                            res.redirect('/');
                            console.log(err, req);
                        })
                                            })

                                        });

                                    });

                                });

            port.serializeUser(function(id, done) {
            console.log(user_id);
            done(null, user_id);
            console.log(done, user_id, 'ser');
                                    console.log('User id is:' + user_id);

        });
                            });

        port.deserializeUser(function(user_id, done) {
        // sqlDatabase.query("SELECT * FROM users WHERE id = "+ id, function (err, rows) {
        done(null, user_id);
        console.log(done, user_id, 'deser');
                                console.log('User id is:' + user_id);

    })
                        })


function authenticationMiddleware() {
    return function(req, res, next) {
                                console.log(`req.session.passport.user: ${JSON.stringify(
session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
                        }

                        module.exports = router;
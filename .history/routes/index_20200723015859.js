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



var server = require('http').createServer(express);
var socket = require('socket.io')
var io = socket(server);


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
    const { comments } = req.body;
    const user = req.user;

    const sqlDatabase = require('../db.js');
    sqlDatabase.connect(function(err) {
        io.on('connection', (socket) => {
                console.log('socket connect successful', socket.id);

                socket.on('chat', function(data) {
                    users[data] = socket.id;
                    io.emit('chat', data)
                })
            })
            // sqlDatabase.query('INSERT INTO comments (comments) VALUES (?)', [comments], function(error, results, fields) {
        sqlDatabase.query("INSERT INTO comments (user_id, comments) VALUES (?, ?)", [user, comments], function(error, results, fields) {
            if (error) throw error;
            console.log(results);
        })

    })
})

router.get("/superhero-movies", authenticationMiddleware(), function(req, res, err) {

    sqlDatabase.query("SELECT users.username, comments.comments, comments.date FROM users INNER JOIN comments ON users.user_id=comments.user_id",
        function(error, results, fields) {
            if (error) throw error;


            res.render('superhero-movies', JSON.stringify(results.date));

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




            if (results.length === 0) {
                done(null, false, { message: 'Check email and password again.' });
            } else {

                const hash = results[0].
                password.toString();

                const user_id = results[0].user_id;


                bcrypt.compare(password, hash, function(err, response) {
                    console.log(user_id);
                    if (response === true) {
                        return done(null, user_id);
                    } else {
                        console.log(user_id);
                        console.log(err);
                        return done(null, false, { message: 'This is a test notification.' });

                    }
                })
            }

        })

    }));

passport.serializeUser(function(user_id, done) {
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



    sqlDatabase.query('SELECT * FROM users WHERE email =?', [email], async(error, results, ) => {
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

        sqlDatabase.query('SELECT * FROM users WHERE username =?', [username], async(error, results, ) => {
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

            bcrypt.hash(password, saltRounds, function(err, hash) {
                sqlDatabase.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields) {
                    if (error) throw error;
                    console.log(results);

                    sqlDatabase.query('SELECT LAST_INSERT_ID() as id', async function(error, results, fields, err) {
                        if (error) throw error;
                        console.log(error);

                        const user_id = results[0];
                        console.log(user_id);

                        req.login(user_id, function(err) {
                            res.redirect('/');
                            console.log(err, req);
                        })
                    })

                });

            });

        });

        passport.serializeUser(function(id, done) {
            console.log(user_id);
            done(null, user_id);
            console.log(done, user_id, 'ser');
            console.log('User id is:' + user_id);

        });
    });

    passport.deserializeUser(function(user_id, done) {
        // sqlDatabase.query("SELECT * FROM users WHERE id = "+ id, function (err, rows) {
        done(null, user_id);
        console.log(done, user_id, 'deser');
        console.log('User id is:' + user_id);

    })
})


function authenticationMiddleware() {
    return function(req, res, next) {
        console.log(`req.session.passport.user: ${JSON.stringify(
                    req.session.passport)}`);
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}

module.exports = router;
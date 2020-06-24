const express = require('express');
const router = express.Router();


// const expressValidator = require('express-validator');


// recieve pages from client
router.get("/", function (req, res) {
    res.render('home');
});

router.get("/register",  function (req, res, next) {
    res.render('register');


});

router.get("/login", function (req, res, next) {
    res.render('login');
});

router.get("/profile", function (req, res)  {
    res.render('profile', {title: 'profile'});
});



// send pages from server

router.post("/register", function (req, res, next)  {
    // req.checkBody('username').notEmpty();

    // if(errors) {
    //     console.log(errors)
    //     return res.render('register', {
    //         message: 'Field cannot be empty',
    //     })
    // }

    const {username, email, password} = req.body;

    const sqlDatabase = require('../db.js');


    sqlDatabase.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password], function (error, results, fields) {
        if(error) throw error;
        res.redirect('/');
        console.log(results);

    })
    
})

router.post("/login", (req, res) => {
    res.render('/')

});

// router.post('/register', usercontrol.register);
// router.post("/login", usercontrol.login)

module.exports = router;
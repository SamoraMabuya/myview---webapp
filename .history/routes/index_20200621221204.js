const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


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

router.post("/register", function (req, res, next) {
    const sqlDatabase = require('../db.js');

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
    const {username, email, password} = req.body;



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
const express = require('express');
const router = express.Router();


const expressValidator = require('express-validator');


// recieve pages from client
router.get("/", function (req, res) {
    res.render('home');
});

router.get("/register",  function (req, res, next) {
    res.render('register');
    console.log(req.body.username);

});

router.get("/login", function (req, res, next) {
    res.render('login');
});

router.get("/profile", function (req, res)  {
    res.render('profile', {title: 'profile'});
});



// send pages from server

router.post("/register", function (req, res)  {

    const sqlDatabase = require('../db.js');

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
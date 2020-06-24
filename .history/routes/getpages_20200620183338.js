const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../sqlcontrol/users');

// authenticationMiddleware();

router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", authenticationMiddleware,  function (req, res) {
    res.render('register');

});

router.get("/login", authenticationMiddleware, function (req, res, next) {
    res.render('login');
});

router.get("/profile", function (req, res)  {
    res.render('profile', {title: 'profile'});
});

module.exports = router;
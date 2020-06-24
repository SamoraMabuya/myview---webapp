const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../sqlcontrol/users')

router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", authenticationMiddleware , r');

});

router.get("/login", function (req, res) {
    res.render('login');
});

router.get("/profile",  authenticationMiddleware(), function (req, res, callback)  {
    res.render('profile', {title: 'profile'});
});

module.exports = router

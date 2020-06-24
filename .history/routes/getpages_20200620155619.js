const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", function (req, res) {
    res.render('register');

});

router.get("/login", function (req, res) {
    res.render('login');
});

router.get("/profile",  authenticationMiddleware(), function (req, res)  {
    res.render('profile', {title: 'profile'});
});

module.exports = router

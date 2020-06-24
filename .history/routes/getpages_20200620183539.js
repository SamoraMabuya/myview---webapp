const express = require('express');
const router = express.Router();
const auth = require('../sqlcontrol/users')();

// authenticationMiddleware();

router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", auth,  function (req, res) {
    res.render('register');

});

router.get("/login", auth, function (req, res) {
    res.render('login');
});

router.get("/profile", function (req, res)  {
    res.render('profile', {title: 'profile'});
});

module.exports = router;
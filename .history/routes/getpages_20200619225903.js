const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get("/", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated())
    res.render('home');
});

router.get("/register", (req, res) => {
    res.render('register');

});

router.get("/login", (req, res) => {
    res.render('login');
});

module.exports = router

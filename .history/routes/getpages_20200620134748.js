const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", (req, res) => {
    res.render('register');

});

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/profile", (req, res) => {
    res.render('profile', {title: 'profile'});
});

module.exports = router

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

router.get("/Profile", (req, res) => {
    res.render('Profile', {title: 'Profile'});
});

module.exports = router

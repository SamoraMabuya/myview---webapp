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

router.get("/community", (req, res) => {
    res.render('community');
});

module.exports = router

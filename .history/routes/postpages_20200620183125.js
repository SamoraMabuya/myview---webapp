const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const passport = require('passport');
// const passportcontrol = require('../sqlcontrol/passportConfig');
const router = express.Router();


router.post("/register", (req, res) => {
    usercontrol.register
})
router.post("/login", (req, res) => {
    usercontrol.login
})
// router.post("/login", usercontrol.login)

router.post("/login", (req, res) => {passport.authenticate
    'local', {
        successRedirect: '/register',
        failureRedirect: '/login'
    };
})

// router.post("/login", usercontrol.login)

module.exports = router

const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const passport = require('passport');
// const passportcontrol = require('../sqlcontrol/passportConfig');
const router = express.Router();



router.post("/login", (req, res) => {
    usercontrol.login
})
router.post("register", usercontrol.register)

// router.post("/register", (req, res) => {passport.authenticate(
//     'local', {
//         successRedirect: '/profile',
//         failureRedirect: '/login'
//     }
// )
// })

// router.post("/login", usercontrol.login)

module.exports = router

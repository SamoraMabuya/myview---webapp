const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const passport = require('passport');
const router = express.Router();


// router.post("/register", (req, res) => {
//     usercontrol.register
// })
// router.post("/login", (req, res) => {
//     usercontrol.login
// })
// router.post("/login", usercontrol.login);
router.post('/register', usercontrol.register);


// router.post("/register", (req, res, next) => {
// });

  

router.post("/login", usercontrol.login(
    'local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

module.exports = router

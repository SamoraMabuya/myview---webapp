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
router.post("/login", usercontrol.login);
router.post('/register', usercontrol.register);


// router.post("/register", (req, res, next) => {
// });

  

// router.post("/login", (req, res) => {
//     usercontrol.login (
//     'local', {
//         successRedirect: '/register',
//         failureRedirect: '/login'
//     })
// });

module.exports = router

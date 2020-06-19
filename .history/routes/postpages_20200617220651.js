const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const passportcontrol = require('../sqlcontrol/passportConfig');
const router = express.Router();


router.post("/register", usercontrol.register)
router.post("/login", passportcontrol.login("local", {
    successRedirect: "/",
    failureRedirect: "login"
}))


module.exports = router

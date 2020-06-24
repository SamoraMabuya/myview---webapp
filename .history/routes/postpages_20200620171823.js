const express = require('express');
const usercontrol = require('../sqlcontrol/users');
// const passportcontrol = require('../sqlcontrol/passportConfig');
const router = express.Router();


router.post("/register", function (req, res, next) {
    usercontrol.register,
    next();
});
// router.post("/login", usercontrol.login)


module.exports = router

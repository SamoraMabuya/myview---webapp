const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const router = express.Router();


router.post("/register", (req, res) => {
    usercontrol.register
});
router.post("/login", (req, res) =>  {
    usercontrol.login
});


module.exports = router

const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const router = express.Router();


router.post("/register", function(req, res){
    usercontrol.register
});
router.post("/login", usercontrol.login)



module.exports = router

const express = require('express');
const usercontrol = require('../sqlcontrol/users');
const router = express.Router();


app.post("/register", usercontrol.register)
app.post("/login", usercontrol.login)


module.exports = router

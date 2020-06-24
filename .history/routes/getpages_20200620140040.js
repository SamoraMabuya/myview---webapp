const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');

router.get("/", (req, res) => {
 
    res.render('home');
});

router.get("/register", function (req, res) {
    res.render('register');

});

router.get("/login", function (req, res) {
    res.render('login');
});

router.get("/profile", authenticationMiddleware(), function (req, res)  {
    res.render('profile', {title: 'profile'});
});

function authenticationMiddleware() {
    return(req, res, next) => {
        console.log(
            `req.session.passport.user: ${JSON.
              stringify(req.session.passport)}`);

              if (req.isAuthenticated()) return next();
              res.redirect('login');
    }
}

module.exports = router

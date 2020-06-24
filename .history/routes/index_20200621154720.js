const express = require('express');
const router = express.Router();


// recieve pages from client
router.get("/", function (req, res) {
    res.render('home');
});

router.get("/register",  function (req, res, next) {
    res.render('register');
    console.log(req.body.username);

});

router.get("/login", function (req, res, next) {
    res.render('login');
});

router.get("/profile", function (req, res)  {
    res.render('profile', {title: 'profile'});
});



// send pages from server

router.post("/register", function (req, res)  {
    res.redirect('/');
})

router.post("/login", (req, res) => {
    res.render('/')

});

// router.post('/register', usercontrol.register);
// router.post("/login", usercontrol.login)

module.exports = router;
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');
const usercontrol = require('/sqlcontrol/users');

const app = express();

dotenv.config({ path:  './.env'});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
    
});

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');


connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  
// get and post home
app.get("/", (req, res) => {
    res.render('home');
})
app.post("/", (req, res) => {
    res.render('home');
});


// get and post register
app.get("/register", (req, res) => {
    res.render('register');
});

app.post('/register', req, (req, res) => {
    res.render('register');
})
app.post("/register", usercontrol.register)


// get and post login
app.get("/login", (req, res) => {
    res.render('login');
});

app.post('/login', req, (req, res) => {
    res.render('login');
});
app.post("/login", usercontrol.login)


app.listen(5500, () => {
    module.exports.app
    reload(app);
    console.log('server has started on this port')
})


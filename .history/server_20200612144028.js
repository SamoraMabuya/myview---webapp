const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');

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
  

app.get("/", (req, res) => {
    res.render('home');
})

app.get("/register", (req, res) => {
    res.render('/register');
});

app.listen(5500, () => {
    reload(app);
    console.log('server has started on this port')
})


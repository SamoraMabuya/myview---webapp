const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config({ path:  './.env'});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
    
});

const publicDirectory = path.join(__dirname,'./public/')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
// app.use('/public', express.static('./public'))


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

app.listen(5500, () => {
    console.log('server has started on this port')
})


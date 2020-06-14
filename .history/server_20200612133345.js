const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path:  './.env'});

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
    
});

const publicDirectory = path.join(__dirname,)
console.log(__dirname)
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  

app.get("/", (req, res) => {

})

app.listen( 5500, () => {
    console.log('server has started on this port')
})


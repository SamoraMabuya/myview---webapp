const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path:  './.env'});

const app = express();
app.set('view-engine', 'ejs');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
    
});



app.use('/public', express.static('./public'))


connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  

app.get("/", (req, res) => {
    // res.send('<h1>home page</h1>');
})

app.listen(5500, () => {
    console.log('server has started on this port')
})


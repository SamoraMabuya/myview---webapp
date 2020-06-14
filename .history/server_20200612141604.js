const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const app = express();


dotenv.config({ path:  './.env'});

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
    res.render(home);
})

app.listen(5500, () => {
    console.log('server has started on this port')
})


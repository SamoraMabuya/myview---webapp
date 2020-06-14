const express = require('express');
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_users',
    
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  

app.use.express();
app.get("/", (req, res) => {

})

app.listen( 5500, () => {
    console.log('server has started on this port')
})


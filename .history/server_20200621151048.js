const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');
const bodyParer = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');


const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
// initiatePassport(passport);

require('dotenv').config();


const sqlDatabase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    
});

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

var options = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

};
var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'mesomesomess',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

sqlDatabase.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  


// app.use('/', require('./sqlcontrol/users'));
app.use('/', require('./routes/index'));
app.use('db', require('./db'));


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         console.log(username);
//         console.log(password);
//         const db = require('./users');

//         db.query('SELECT password FROM users WHERE email = ?', [email],
//         function(error, results, fields) {
//             if(error) {
//                 done(error)

//             };
//             if(results.length == 0) {
//                 done(null, false);
//             }

//             console.log(results[0].password.toString());
//             const hash = results[0].password.toString();

//             bcrypt.compare(password, hash, function(error, response) {
//                 if(response === true) {
//                     return done(null,{user_id: results[0].id});
//                 } else {
//                     return done(null, false);

//                 }

//             })

//         })
//     }
//   ));

app.listen(5500, () => {
    module.exports.app
    reload(app);
    console.log('server has started on this port')
})


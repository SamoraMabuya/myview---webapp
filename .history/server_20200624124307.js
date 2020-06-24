const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');


const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
var MySQLStore = require('express-mysql-session')(session);



dotenv.config({ path:  './.env'});


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
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
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
    secret: 'xcvcsdcdsdcdcdc',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


sqlDatabase.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  


app.use('/', require('./routes/index'));
// app.use('/index', require('./routes/index'));

passport.use(new LocalStrategy(
function(email, password, done) {
    console.log(email, password);
    const sqlDatabase = require('./db');

    sqlDatabase.query('SELECT id password FROM users WHERE email = ?',
    [emai], function(err, results, fields) {
        if(err)
        console.log(error);
        if (results.length === 0) {
            done(null, false);
        }

        const hash = results[0].password.toString();

        bcrypt.compare(password, hash, function(err, response) {
            if( response === true) {
                return done(null, {user_id: results[0].id});
            } else {
                return done(null, false);
            }
        })
    }
    )
      return done(null, false);

}));



app.listen(5500, () => {
    reload(app);
    console.log('server has started on this port')
})


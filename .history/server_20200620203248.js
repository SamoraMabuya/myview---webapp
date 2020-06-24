const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);

// initiatePassport(passport);

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
  


app.use('/', require('./sqlcontrol/users'));
app.use('/postpages', require('./routes/postpages'))

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        console.log(password);
        return done(null, 'user')
        const db = require('./sqlcontrol/users')

        db.query('SELECT password FROM users WHERE email = ?', [email],
        function(error, results, fields) {
            if(error) {
                done(error)
            };
            if(results.length == 0) {
                done(null, false);
            }

            return done(null, 'fadfad');
        })
    }
  ));

app.listen(5500, () => {
    module.exports.app
    reload(app);
    console.log('server has started on this port')
})


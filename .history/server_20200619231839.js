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
var MySQLStore = require('express-mysql-session')(session);

// initiatePassport(passport);

dotenv.config({ path:  './.env'});


var options = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    
};

var sessionStore = new MySQLStore(options);


const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(session({
    secret: 'mesomesomess',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

options.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
})
  


app.use('/', require('./routes/getpages'));
app.use('/postpages', require('./routes/postpages'))


app.listen(5500, () => {
    module.exports.app
    reload(app);
    console.log('server has started on this port')
})


const express = require('express');
const expressValidator = require('express-validator');
var app = express();


const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// passports

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var flash = require('express-flash-messages')

const session = require('express-session');
const { on } = require('process');
var MySQLStore = require('express-mysql-session')(session);



// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     console.log('socket connect successful');

//     socket.on('chat', function(data) {
//         io.sockets.emit('chat', data)
//     })
// });



dotenv.config({ path: './.env' });


var sqlDatabase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

});


app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser('key cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cors());


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

var options = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

};

var sessionStore = new MySQLStore(options);


app.use(session({
    secret: 'key cat',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());




sqlDatabase.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('mysql is connected')
    }
});



server.use((function(req, res, next) {
            res.locals.isAuthenticated = req.isAuthenticated();
            next();

        })







        app.use('/', require('./routes/index')); app.use('/index', require('./routes/index'));




        app.listen(5500, () => {
            reload(app);
            console.log('server has started on this port')
        })
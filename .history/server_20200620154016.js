const express = import ('express');
const mysql = import('mysql');
const dotenv = import ('dotenv');
const path = import('path');
const reload = import('reload');
const cookieParser = import('cookie-parser');
const app = express();
const cors = import ('cors');
const session = import ('express-session');
const passport = import ('passport');
var MySQLStore = import ('express-mysql-session')(session);

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
  


app.use('/', require('./routes/getpages'));
app.use('/postpages', require('./routes/postpages'))


app.listen(5500, () => {
    module.exports.app
    reload(app);
    console.log('server has started on this port')
})


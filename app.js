const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const cors = require('cors');

const de = require('./router/de');
const feedRouter = require('./router/feed');
const searchRouter = require('./router/search');
const apiRouter = require('./router/api');
const authRouter =require('./router/auth');
const db = require('./util/database');

//express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db
const options = {
    host: 'localhost',
    port: 3306,
    user: 'lurang',
    database: 'node',
    password: 'wnsgh'
};

//session-mysql
const sessionStore = new MySQLStore(options);
app.use(session({
    secret              : 'tisecret',
    secure              : false,
    resave              : false,
    saveUninitialized   : false,
    store               : sessionStore
}))
//passport
app.use(passport.initialize());
app.use(passport.session());

//nunjucks
app.set('view engine', 'nunjucks');
const env = nunjucks.configure(['views/'],{
    autoescape: true,
    express: app,
});

const auth = (req, res, next) => {

}
//cors error
app.use(cors())
app.use((req, res ,next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin','*'); //*대신 specific domain 가능
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Credentials'); 
    next();
});

//routes
app.use(de.routes);
app.use('/feed',feedRouter.routes);
app.use('/search',searchRouter.routes);
app.use('/api',apiRouter.routes);
app.use('/auth',authRouter.routes);

app.listen(3000);
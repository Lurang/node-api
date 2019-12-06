const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const de = require('./router/de')
const feedRouter = require('./router/feed');
const searchRouter = require('./router/search');
const apiRouter = require('./router/api')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'nunjucks');

const env = nunjucks.configure(['views/'],{
    autoescape: true,
    express: app,
});

//cors error
app.use( (req, res ,next) => {
    res.setHeader('Access-Control-Allow-Origin','*'); //*대신 specific domain 가능
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    next();
});

app.use(de.routes);
app.use('/feed',feedRouter.routes);
app.use('/search',searchRouter.routes);
app.use('/api',apiRouter.routes);

app.listen(3000);
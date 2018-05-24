const path         = require('path');
const express      = require('express');
const bodyParser   = require('body-parser');
const passport     = require('passport');
const session      = require('express-session');
const RedisStore   = require('connect-redis')(session);
const config       = require('config');
const cookieParser = require('cookie-parser');
const dbControl    = require('./mongo').Controller;
const app          = express();
const ROOT         = __dirname + '/view/build/';

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.use(cookieParser());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(express.static(ROOT));

app.get('/login', (req, res)=>{
    res.sendFile(ROOT+'index.html');});

app.get('/inbox', (req, res)=>{
    res.sendFile(ROOT+'index.html');});

app.get('/m/*', (req, res)=>{
    res.sendFile(ROOT+'index.html');});

app.get('/s/*', (req, res)=>{
    res.sendFile(ROOT+'index.html');});

app.get('/contract', (req, res)=>{
    res.sendFile(ROOT+'index.html');});

require('./authentication').init(app);

app.use(session({
    store: new RedisStore({
        host: config.get('RedisStore.host'),
        port: config.get('RedisStore.port')
    }),
    secret: config.get('RedisStore.secret'),
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

require('./user').init(app);
require('./message').init(app);

dbControl.init();

module.exports = app;

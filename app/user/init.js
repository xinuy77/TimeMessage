const passport  = require('passport');
const dbControl = require('../mongo').Controller;

function initUser (app) {
    app.get('/', renderWelcome);
    app.get('/user', passport.authenticationMiddleware(), getUserName);
    app.get('/route/:route', getUserNameByRoute);
    app.get('/auth/twitter', passport.authenticate('twitter', {session: false}));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/',
        session: false
    }), (req, res)=>{
        res.cookie('auth_token', req.user.twitter_token);
        res.redirect('/inbox');
    });
    app.get('/logout', passport.authenticationMiddleware(), removeSession);
    app.get('/loggedin', passport.authenticationMiddleware(), sendOk);
}

function renderWelcome (req, res) {
    res.send('user/welcome')
}

function renderProfile (req, res) {
    res.send(JSON.stringify(req.user));
}

function removeSession(req, res) {
    res.clearCookie('connect.sid');
    res.clearCookie('auth_token');
    res.redirect('/');
}

function sendOk(req, res) {
    /*
    if(req.isAuthenticated()) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }*/
    res.sendStatus(200);
}

function getUserName (req, res) {
    var token = req.cookies.auth_token;
    dbControl.getUserByToken(token, (user)=>{
        res.send(JSON.stringify({u_name: user.u_name, route: user.route}));
    })
}

function getUserNameByRoute(req, res) {
    var route = req.params.route;
    var userData;
    var response;
    dbControl.getUserByRoute(route, (user)=>{
        if(user === null || user === undefined) {
            res.sendStatus(400);
        }
        else {
            userData = {u_name: user.u_name};
            response = JSON.stringify(userData);
            res.send(response);
        }
    });
}

module.exports = initUser

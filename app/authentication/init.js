const passport                 = require('passport');
const config                   = require('config');
const TwitterStrategy          = require('passport-twitter').Strategy;
const authenticationMiddleware = require('./middleware');
const dbControl                = require('../mongo').Controller;
const TWITTER_CONSUMER_KEY     = config.get('Passport.twitter_consumer_key');
const TWITTER_CONSUMER_SECRET  = config.get('Passport.twitter_consumer_secret');
const CALLBACKURL              = config.get('Passport.callbackUrl');

passport.serializeUser(function (user, cb) {
    console.log(user)
    cb(null, user.id);
})

passport.deserializeUser(function (user, cb) {
    cb(null, user);
})

function initPassport () {
    passport.use(new TwitterStrategy({
            consumerKey:    TWITTER_CONSUMER_KEY,
            consumerSecret: TWITTER_CONSUMER_SECRET,
            callbackURL:    CALLBACKURL
        },
        function(token, tokenSecret, profile, done) {
            passport.session.id          = profile.id;
            profile.twitter_token        = token;
            profile.twitter_token_secret = tokenSecret;
            updateUserProfile(profile, token, tokenSecret, ()=>{
                process.nextTick(function () {
                    return done(null, profile);
                });
            });
        }
    ));
    passport.authenticationMiddleware = authenticationMiddleware;
}

function updateUserProfile(profile, token, tokenSecret, callback) {
    dbControl.twitterUserExists(profile.id, (exists)=>{
        if(exists) {
            dbControl.refreshTwitterUser(profile, callback);
        }
        else {
            dbControl.addTwitterUser(profile, token, tokenSecret, callback);
        }
    });
}

module.exports = initPassport;

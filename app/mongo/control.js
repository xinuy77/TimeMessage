const collection = require('./mongo');
const schema     = require('./schema');
const crypto     = require('crypto');
const base64url  = require('base64url');

function addTwitterUser(profile, token, tokenSecret, callback) {
    var user;
    var route    = base64url(crypto.randomBytes(5)).toString('base64');
    var currDate = new Date().toISOString();
    getNextId("u_id", (u_id)=>{
        user = new schema.User(u_id, parseInt(profile.id), null, null, 
                              profile.displayName, currDate, route, token, tokenSecret);
        collection('user', (db)=>{
            db.insert(user, ()=>{
                callback();        
            });
        });
    });
}

function twitterUserExists(t_id, callback) {
    var user = {t_id: parseInt(t_id)}; 
    collection('user', (db)=>{
        db.findOne(user, (err, res)=> {
            console.log(res);
            if(err) {
                callback(err);
            }
            else if(res === null) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    });
}

function initCounter() {
    var userCounter = {_id: "u_id", seq:0};
    var msgCounter  = {_id: "m_id", seq:0};

    collection("counter", (db)=>{
        db.count((err, count)=>{
            // create counter if none exists
            // else do nothing
            if(! err && count === 0) {
                db.insert(userCounter);
                db.insert(msgCounter);
            }
        });
    });
}

function getNextId(idParam, callback) {
    var query_1 = {_id: idParam};
    var id;
    collection("counter", (db)=>{
        db.findOne(query_1, (err, res)=>{
            id = res.seq;
            db.updateOne({_id: idParam},{$inc: {seq: 1}}, (err, res)=>{
                callback(id);
            });
        });
    });
}

function refreshTwitterUser(profile, callback) {
    var user     = schema.cleanUser(null, parseInt(profile.id)); 
    var currDate = new Date().toISOString();
    var update   = schema.cleanUser(null, null, null, null, profile.displayName, currDate);

    collection('user', (db)=>{
        db.updateOne(user, {$set: update}, (err, res)=> {
            callback();
        });
    });
}

function getMessageByToken(token, qty, callback) {
    var currDate       = new Date().toISOString();
    var unAvailableMsg = {$and: [{
        "token": token
    }, {
        "available_date": {$gt: currDate}
    }]};
    var availableMsg   = {$and: [{
        "token": token
    }, {
        "available_date": {$lte: currDate}
    }]};
    var recentlySent   = {available_date: -1};
    var msgList        = {availableMsg: null, unAvailableMsg: null};
    var s_qty          = qty - 10;
    if(s_qty < 0) {
        s_qty = 0;
    }
    collection('message', (db)=>{
        db.find(availableMsg).sort(recentlySent).skip(s_qty).limit(10).toArray((err, res)=>{
            console.log(res)
            if(err) {
                callback("db err");
            }
            else {
                for(var i = 0; i < res.length; i++) {
                    delete res[i].t_id;
                    delete res[i].route;
                    delete res[i]._id;
                }
                msgList.availableMsg = res;
                db.find(unAvailableMsg).sort(recentlySent).skip(s_qty).limit(10).toArray((err,res)=>{
                    if(err) {
                        callback("db err");
                    }
                    else {
                        for(var i = 0; i < res.length; i++) {
                            delete res[i].text;
                            delete res[i].t_id;
                            delete res[i].route;
                            delete res[i]._id;
                            delete res[i].shareRoute;
                        }
                        msgList.unAvailableMsg = res;
                        callback(msgList);
                    }
                });
            }
        })
    });
} 

function getMsgByShareRoute(shareRoute, callback) {
    var query = {shareRoute: shareRoute};
    console.log(query);
    collection('message', (db)=>{
        db.findOne(query, (err, res)=>{
            console.log(res);
            callback(res);
        });
    });
}

function getUserByToken(token, callback) {
    var user = {"token": token};
    collection('user', (db)=>{
        db.findOne(user, (err, res)=>{
            if(err) {
                callback("db err");
            }
            else {
                callback(res);
            }
        });
    });
}

function getUserByRoute(route, callback) {
    var user = schema.cleanUser(null, null, null, null, null, null, route);
    if(route === null || route === undefined) {
        callback("err: route null");
    }
    collection('user', (db)=>{
        db.findOne(user, (err, res)=>{
            if(err) {
                callback("db err");
            }
            else {
                callback(res);
            }
        });
    });
}

function getUserByToken(token, callback) {
    var user = {token: token}
    console.log(user)
    collection('user', (db)=>{
        db.findOne(user, (err, res)=>{
            console.log("response")
            console.log(res)
            if(err) {
                callback("db err");
            }
            else {
                callback(res)
            }
        })
    });
}

function insertMessage(msg, callback) {
    var shareRoute = base64url(crypto.randomBytes(8)).toString('base64');
    getNextId("m_id", (m_id)=>{
        msg.m_id       = m_id;
        msg.shareRoute = shareRoute;
        collection('message', (db)=>{
            db.insert(msg, callback());
        });
    });
}

function updateReadMessage(m_id, callback) {
    var query = {m_id: m_id};
    var read  = {$set:{'read':true}};

    if(m_id === null || m_id === undefined) {
        callback(true);
        return;
    }

    collection('message', (db)=>{
        db.updateOne(query, read, (err, res)=>{
            if(err) {
                callback(err);
            }
            else {
                callback(false);
            }
        });
    });
}

module.exports = {
    addTwitterUser:        addTwitterUser,
    twitterUserExists:     twitterUserExists,
    refreshTwitterUser:    refreshTwitterUser,
    getMessageByToken:     getMessageByToken,
    insertMessage:         insertMessage,
    getMsgByShareRoute:    getMsgByShareRoute,
    getUserByToken:        getUserByToken,
    updateReadMessage:     updateReadMessage,
    getUserByRoute:        getUserByRoute,
    getUserByToken:        getUserByToken,
    init:                  initCounter
}

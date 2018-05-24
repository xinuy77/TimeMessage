const passport     = require('passport')
const dbControl    = require('../mongo').Controller;
const validMessage = require('./validator');
const Jimp         = require('jimp'); // remove later
const watermark    = require('dynamic-watermark'); // remove later
const fs           = require('fs');
const gm           = require('gm').subClass({imageMagick: true});

function initMessage(app) {
    app.get('/message/:quantity', passport.authenticationMiddleware(), getMessage);
    app.get('/message/img/:shareRoute', getMessageImg);
    app.post('/message', /*passport.authenticationMiddleware(),*/ sendMessage);
    app.put('/message/read', passport.authenticationMiddleware(), readMessage);
}

function getMessage(req, res) {
    var token = req.cookies.auth_token;
    var qty   = parseInt(req.params.quantity);
    dbControl.getMessageByToken(token, qty, (message)=>{
        res.send(JSON.stringify(message));
    });
}

function sendMessage(req, res) {
    var msg = req.body;
    var route;

    msg.sent_date = new Date().toISOString();
    // validatte ng word
    if(validMessage(msg)) {
        route = msg.route;
        dbControl.getUserByRoute(route, (user)=>{
            if(user != null) {
                msg.t_id  = user.t_id;
                msg.token = user.token;
                msg.read  = false;
                
                dbControl.insertMessage(msg, (result)=>{
                    res.sendStatus(200);
                });
            }
        });
    }
    else {
        res.sendStatus(400);
    }
}

function getMessageImg(req, res) {
    var shareRoute   = req.params.shareRoute;
    var imgPath      = './app/message/msg.png';
    var msgTxt       = "aaaaa";
    var textFontSize = 26;
    var text;
    var outputPath;
    dbControl.getMsgByShareRoute(shareRoute, (msg)=>{
        if(msg === null || msg === undefined) {
            res.sendStatus(400);
            return;
        }
        else {
            text       = formatMessageText(msg.text);
            outputPath = './app/message/tmp-img/' + msg.m_id + '.png';
            gm(imgPath)
            .gravity('Center')
            .fontSize(textFontSize)
            .fill('#2E2E2E')
            .font('./app/view/build/yasashi.ttf')
            .encoding('Unicode')
            .drawText(0, -20, text)
            .write(outputPath, ()=>{
                outputPath = __dirname + outputPath.substring(13, outputPath.length);
                res.sendFile(outputPath, ()=>{console.log("done")});
            });
        }
    });
}

function formatMessageText(text) {
    var formatText = "";
    for(var i = 0; i < text.length; i++) {
        if(i%20 === 0) {
            formatText += '\n' + text.charAt(i);
        }
        else {
            formatText += text.charAt(i);
        }
    }
    return formatText;
}

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function readMessage(req, res) {
    var m_id = req.body.m_id;
    dbControl.updateReadMessage(m_id, (err)=>{
        if(!err) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(400);
        }
    });
}

module.exports = initMessage;

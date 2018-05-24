const dbControl = require('../mongo').Controller;

function authenticationMiddleware () {
    return function (req, res, next) {
        var token = req.cookies.auth_token;
        if(token != undefined && token != null) {
            dbControl.getUserByToken(token, (user)=>{
                if(user != null && user != undefined) {
                      return next();
                }
            }) 
        }
        else {
            console.log("was status 400");
            res.sendStatus(400);
            return;
        }
  }
}

module.exports = authenticationMiddleware;

const app   = require('./app')
const https = require('https')
const port  = process.env.PORT || 443 //5000
const fs    = require('fs');

var options = {
      key: fs.readFileSync( './certificate/privkey.pem' ),
      cert: fs.readFileSync( './certificate/cert.pem' )
};

https.createServer(options, app).listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`server is listening on ${port}...`)
});

const MongoClient = require('mongodb').MongoClient;
const test        = require('assert');
const config      = require('config');
const url         = 'mongodb://' + config.get('MongoDB.host') + ':' + config.get('MongoDB.port');
const dbName      = config.get('MongoDB.dbName');

/**
 * Returns collection from db
 * by given name to callback
 *
 * @param string name
 * @param function callback
 */
function collection(name, callback) {
    MongoClient.connect(url, function(err, client) {
        if(err) {
            console.log(err);
            process.exit(-1);
        }
        var col = client.db(dbName).collection(name);
        callback(col);
    });
}

module.exports = collection;

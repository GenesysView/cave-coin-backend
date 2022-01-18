var db = require('../../sqldb');

var TokenTable = db.mongoose.Schema({
    logo: String,
    name: String,
    address: [
        {
            name: String,
            address: String
        }
    ],
    symbol: String,
    description: String,
    exchange: String,
    identifier: String
});
var Token = db.mongoose.model('tokens', TokenTable);

module.exports = Token;
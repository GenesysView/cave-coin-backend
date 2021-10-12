var db = require ('../../sqldb');

var TokenTable = db.mongoose.Schema({
    logo: String,
    name: String,
    link:String,
    symbol:String,
    description:String
});
var Token = db.mongoose.model('tokens', TokenTable);

module.exports = Token;
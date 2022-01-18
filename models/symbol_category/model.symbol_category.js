var db = require ('../../sqldb');

var Schema = db.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SymbolCategoryTable = db.mongoose.Schema({
    chain_identifier:String,
    name:String,
    shortname:String,
    key:String
});
var SymbolCategory = db.mongoose.model('symbol_category', SymbolCategoryTable);

module.exports = SymbolCategory;
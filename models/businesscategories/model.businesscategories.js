var db = require ('../../sqldb');
//console.log('entro ruta');

var BusinessCategories = db.mongoose.Schema({
    name:String
});
var BusinessCategory = db.mongoose.model('businesscategories', BusinessCategories);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = BusinessCategory;


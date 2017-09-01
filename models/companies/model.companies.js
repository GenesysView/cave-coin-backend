var db = require ('../../sqldb');
//console.log('entro ruta');

var CompanyTable = db.mongoose.Schema({
    name: String,
    idUser: String,
    nit:String,
    rut:String,
    picture:String
});
var Company = db.mongoose.model('company', CompanyTable);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = Company;
var db = require ('../../sqldb');
//console.log('entro ruta');
var Schema = db.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OfficeTable = db.mongoose.Schema({
    name:String,
    adress:String,
    phone:String,
    email: String,
    password: String,
    longitud:String,
    latitude:String,
    principal:Boolean,
    cell_phone: {ext:String,number:String},
    avatar: { data: Buffer, contentType: String },
    idCompany:ObjectId,
    categories: [],
    calificaciones: []

});
var Office = db.mongoose.model('offices', OfficeTable);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = Office;
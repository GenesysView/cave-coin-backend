var db = require ('../../sqldb');
//console.log('entro ruta');

var Schema = db.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LoginTable = db.mongoose.Schema({
    user_name:String,
    email: String,
    password: String,
    cell_phone: {ext:String,number:String},
    active:Boolean,
    id_user: ObjectId

});
var Login = db.mongoose.model('logins', LoginTable);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = Login;
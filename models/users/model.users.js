var db = require ('../../sqldb');
//console.log('entro ruta');

var UserTable = db.mongoose.Schema({
    name: String,
    movil: String,
    email: String,
    nameUser: String,
    password: String,
    picture:String,
    description:String,
    facebook:String,
    categorias:[],
    adress:String
});
var User = db.mongoose.model('users', UserTable);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = User;

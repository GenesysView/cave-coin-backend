var db = require ('../../sqldb');
//console.log('entro ruta');

var Schema = db.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OfficesHasCategoriesTable = db.mongoose.Schema({
    idOffice: ObjectId,
    categoriesList:[]
});
var OfficeHasCategory = db.mongoose.model('officeshascategories', OfficesHasCategoriesTable);

//var Ruta = db.Mongoose.model('palmira', RutaTable);

//console.log('fin');

module.exports = OfficeHasCategory;
const mongoose = require('mongoose');
//var sha512 = require('js-sha512');


var db = {
    Mongoose:mongoose,
    mongoose: mongoose.connect('mongodb://localhost:27017/caveio')
};


module.exports = db;
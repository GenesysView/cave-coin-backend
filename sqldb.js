const mongoose = require('mongoose');
//var sha512 = require('js-sha512');


var db = {
    Mongoose:mongoose,
    mongoose: mongoose.connect('mongodb://facemapp07:facemapp07@ds119044.mlab.com:19044/heroku_ksns66ss')
};


module.exports = db;
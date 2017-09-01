const mongoose = require('mongoose');
//var sha512 = require('js-sha512');


var db = {
    Mongoose:mongoose,
    mongoose: mongoose.connect('mongodb://localhost/facemappdb')
};

var promise = mongoose.createConnection('mongodb://localhost/facemappdb', {
    useMongoClient: true,
    /* other options */
  });
  promise.then(function(db) {
      console.log('yes');
    /* Use `db`, for instance `db.model()`
  });
  // Or, if you already have a connection
  connection.openUri('mongodb://localhost/myapp', { /* options */ });
module.exports = db;
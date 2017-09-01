var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//configura la decodifcacion y codificacion de json para los rest
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb'}));
var config= require('./config.js');
var routes= require('./routes.js').default(app);
var db = require('./sqldb');


app.set('superSecret', config.secret);
function StartServer(){
  app.listen(config.server.port, function () {
    console.log('Example app listening on port '+config.server.port);
    //var ruta=require('./models/users/model.users');
  });
}

db.mongoose
  .then(function(err) {
    StartServer();
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = app;
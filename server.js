var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
//configura la decodifcacion y codificacion de json para los rest
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb' }));
var config = require('./config.js');
var routes = require('./routes.js').default(app);
var db = require('./sqldb');
var https = require('https');
var fs = require('fs');
var debug = require('debug')('Server');
const WebSocket = require('ws');

var serverIO = http.createServer(app);

// var server = https.createServer({
//   key: fs.readFileSync('/root/server.key'),
//   cert: fs.readFileSync('/root/cavecoin_app.crt')
// }, app);
console.log(__dirname + '/images');
app.use('/public', express.static(__dirname + '/images'));
app.set('superSecret', config.secret);
function StartServer() {

  // server.listen(config.server.securePort, config.server.host);
  // server.on('error', onError);
  // server.on('listening', onListening);

  var server = app.listen(config.server.port, function () {
    console.log('Example app listening on port ' + config.server.port);
    const socket = require('./socket').server(server);
  });
  const Web3 = require('web3');
  console.log('mensaje principal');
  console.log(parseInt('0x61706b80'));
  console.log('fin mensaje principal');



  const ws = new WebSocket('wss://fstream.binance.com/ws/adabusd@trade');

  ws.on('message', (data) => {
    if (data) {
      const trade = JSON.parse(data); // parsing single-trade record
      // console.log(trade);
    }
  });
}

db.mongoose
  .then(function (err) {
    StartServer();
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = server.address();
  console.log('---addr--', addr);
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
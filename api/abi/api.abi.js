var express = require('express');
var controller = require('../../controllers/abi/controller.abi.js');
console.log('user');

var router = express.Router();
router.post('/decode', controller.decode);

module.exports = router;
var express = require('express');
var controller = require('../../controllers/config/controller.config');
console.log('user');

var router = express.Router();
router.get('/updateTokenListFromCoingecko', controller.updateTokenListFromCoingecko);
router.get('/updateInfoTokenListFromCoingecko', controller.updateInfoTokenListFromCoingecko);

module.exports = router;
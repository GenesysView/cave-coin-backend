var express = require('express');
var controller = require('../../controllers/tokens/controller.tokens');
console.log('user');

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/searchByNameAndSymbol/:item', controller.searchByNameAndSymbol);
router.get('/byToken/:token', controller.byToken);

module.exports = router;
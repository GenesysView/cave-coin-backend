var express = require('express');
var controller = require('../../controllers/tokens/controller.tokens');
console.log('user');

var router = express.Router();
router.get('/', controller.index);
router.get('/updateListTokens', controller.updateListTokens);
router.post('/getOHLCVHistorical', controller.getOHLCVHistorical);
router.get('/:id', controller.show);
router.get('/searchByNameAndSymbol/:item/:platform', controller.searchByNameAndSymbol);
router.get('/byToken/:token', controller.byToken);

module.exports = router;
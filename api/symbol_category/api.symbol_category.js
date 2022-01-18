var express = require('express');
var controller = require('../../controllers/symbol_category/controller.symbol_category.js');

var router = express.Router();
router.get('/', controller.index);

module.exports = router;
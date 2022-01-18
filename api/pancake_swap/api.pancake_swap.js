var express = require('express');
var controller = require('../../controllers/pancake_swap/controller.pancake_swap.js');

var router = express.Router();
router.post('/swap', controller.swap);

module.exports = router;
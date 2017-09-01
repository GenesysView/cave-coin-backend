var express = require('express');
var controller = require('../../controllers/logins/controller.logins');


var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/login/:email/:password', controller.login);
router.get('/findByUserId/:id', controller.findByUserId);
router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


module.exports = router;
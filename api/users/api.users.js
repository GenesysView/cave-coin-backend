var express = require('express');
var controller = require('../../controllers/users/controller.users');
console.log('user');

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/picture/:id', controller.updatePicture);
router.put('/info/:id', controller.update);

// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


module.exports = router;
var express = require('express');
var controller = require('../../controllers/companies/controller.companies');


var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/iduser/:iduser', controller.findByUser);
router.post('/', controller.create);
router.put('/picture/:id', controller.updatePicture);

// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


module.exports = router;
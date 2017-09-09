
var express = require('express');
var controller = require('../../controllers/offices/controller.offices');


var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/idCompany/:id', controller.findByCompany);
router.get('/get/calificacion/:idOffice', controller.getCalificacion);
router.get('/get/officesanduser/search/:name', controller.officesanduser);
router.post('/', controller.create);
router.post('/save/categories', controller.saveCategories);
router.post('/save/calificacion', controller.saveCalificacion);

// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);


module.exports = router;
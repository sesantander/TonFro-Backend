const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./pointController');
const validation = require('./pointValidator');
//get
router.post('/all',validation.getAll, controller.all);

router.post('/add', validation.add, controller.add);

router.put('/activate',validation.activate, controller.activate);

router.post('/update',validation.update, controller.update);

//points images

router.delete('/pointImage', controller.deleteImages);

router.post('/pointImage', controller.addImages);

router.get(`/images/all/:pointId`, controller.getAllImages);

router.get(`/:id`, controller.getPoint);

module.exports = router;   
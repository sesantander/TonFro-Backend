const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./tripController');
const validation = require('./tripValidator');



router.post('/add', validation.add, controller.add);
router.post('/update',validation.update, controller.update);
router.post('/updateSeat',validation.updateSeat, controller.updateSeat);
//get
router.post('/detail',validation.getDetail, controller.getDetail);

//get
router.post('/all',validation.all, controller.all);

//get
router.post('/filtered',validation.filtered, controller.filtered);
router.post('/addPoints', validation.addPoints, controller.addPoints);

router.post ('/allPoints', controller.allPoints);
router.post('/addPrice', validation.addPrice, controller.addPrice);
router.post('/getPrice', validation.getPrice, controller.getPrice);
router.post('/getAllPrice', controller.getAllPrice);

//trip images
router.post('/addPoints/image', controller.addPointImage);
router.delete('/addPoints/image', controller.removeImage);
router.post('/addPoints/image/all', controller.allImages);

router.get('/:id', controller.getTrip);
module.exports = router;   
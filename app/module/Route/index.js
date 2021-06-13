const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./routeController');
const validation = require('./routeValidator');



router.post('/add', validation.add, controller.add);

//get
router.post('/all',validation.all, controller.all);

//get
router.post('/filtered',validation.filtered, controller.filtered);

router.put('/activate',validation.activate, controller.activate);

router.post('/update',validation.update, controller.update);

//points // get
router.post('/point/all',validation.getPoints, controller.getPoints);

router.post('/point/update', validation.updatePoints, controller.updatePoints);

//prices
router.post('/price/add', validation.addPrice, controller.addPrice);
//post
router.post('/price/all',validation.allPrice, controller.allPrices);

router.get('/:id', controller.getRoute);

module.exports = router;   
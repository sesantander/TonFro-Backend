const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./passController');
const validation = require('./passValidator');


router.get('/all',validation.getAll, controller.all);

router.get('/allPurchasedPasses', controller.allPurchasedPasses);

router.post('/add', validation.add, controller.add);

router.post('/update/:id',validation.update, controller.update);

router.post('/filter', controller.filter);

router.post('/filterPurchasedPasses', controller.filterPurchasedPasses);


//User related

router.get('/user/passes', controller.getUserPasses);

router.post('/activate',controller.activatePass);

router.post('/user/buy', validation.buyPass, controller.buyPass);

router.get ('/:id', controller.getPass);





module.exports = router;   

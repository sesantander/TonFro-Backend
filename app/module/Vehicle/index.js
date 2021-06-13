const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./vehicleController');
const validation = require('./vehicleValidator');

router.post('/add',validation.add, controller.add);

router.post('/update', validation.update, controller.update);

router.put('/updateDriver',validation.updateDriver, controller.updateDriver);

router.put('/activate',validation.activate, controller.activate);

//get
router.post('/all',controller.all);

//get
router.post('/driverAssigned',validation.driverAssigned, controller.driverAssigned);

//images
router.post('/image', controller.image);


//imei numbers
router.post('/imei/add',validation.addImei, controller.addImei);
router.get('/imei/all', controller.allImei);
router.post('/imei/update',validation.imeiUpdate, controller.imeiUpdate);
router.post('/imei/assignedVehicle',validation.assignedVehicle, controller.assignedVehicle);
router.get('/imei/:id', controller.imeiForVehicle);
router.get('/:id', controller.getVehicle);
module.exports = router;
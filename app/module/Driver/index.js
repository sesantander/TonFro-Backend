const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./driverController');
const validation = require('./driverValidator');

//get
router.post('/all',validation.all, controller.all);

router.post('/add', validation.add, controller.add);

router.put('/activate',validation.activate, controller.activate);

router.post('/update',validation.update, controller.update);

//get
router.post('/assignedVehicle', validation.assignedVehicle, controller.assignedVehicle);



//profile images
router.post('/profileImage', controller.profileImage);

router.post('/kycImage', controller.updateKycImage);


//get driver app
router.get('/getAssociatedTrips', controller.getTrips);

router.post('/tripBookingData',validation.tripBookingData, controller.tripBookingData);

router.post('/updateBooking', validation.updateBookingData, controller.updateBookingData);

router.get('/:id',controller.getDriver);

module.exports = router;   
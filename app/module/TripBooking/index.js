const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./tripBookingController');
const validation = require('./tripBookingValidator');

//get
router.post('/all',validation.all, controller.all);

router.post('/add', validation.add, controller.add);

router.put('/activate',validation.activate, controller.activate);

router.post('/update',validation.update, controller.update);

router.post('/allJourneyBooking',validation.getAllJourneyBooking, controller.getAllJourneyBooking);

router.post('/dailyTotalBooking',validation.dailyTotalBooking, controller.dailyTotalBooking);

router.post('/totalBooking',validation.totalBooking, controller.totalBooking);

router.post('/monthlyBooking',validation.monthlyBooking, controller.monthlyBooking);

router.post('/availability', validation.availability, controller.availability);

router.post('/checkPrice', validation.checkPrice, controller.checkPrice);

router.get('/all/:id', controller.getAllBookingDataForTrip);

router.get('/:id', controller.getBookingData);

module.exports = router;   
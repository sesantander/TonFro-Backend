const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./bookingController');
const validation = require('./bookingValidator');

router.post('/order/create', validation.createOrder, controller.createOrder);
router.post('/recieve', controller.recievePayment);
router.post('/pass/create', validation.createOrderFromPass, controller.createOrderFromPass);
router.post('/order/sms', controller.sendBookingSMS);
//get
router.post('/history', validation.history, controller.history);
router.post('/update', validation.update, controller.update);
//get
router.post('/status', validation.status, controller.status);
router.put('/cancel', validation.cancel, controller.cancel);
router.post('/all', controller.all);
router.post('/filtered', controller.filtered)

//booking with admin panel
router.get('/recentBooking', controller.recentBooking);
router.get('/monthlyBooking', controller.monthlyBooking);
router.post('/getExcel', controller.getExcel);
router.post('/generateInvoice',  controller.generateInvoice);
router.get('/getInvoice', controller.getInvoice);
router.get('/:id', controller.getBooking);
router.post('/getRoutePriceSeat', controller.getRoutePriceSeat);
router.post('/getBooking', controller.getBookingwithorder);


module.exports = router;   
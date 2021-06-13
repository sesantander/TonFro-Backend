const router = require('express').Router({caseSensitive:true, strict:true});
const controller = require('./userController');
const validation = require('./userValidator');
const passport = require('passport');



router.post('/exist', validation.userExist, controller.userExist);

router.post('/otpLogin', validation.otpLogin, controller.otpLogin);

router.post('/login',validation.login, controller.login);

router.post('/login/fb',passport.authenticate('facebook-token', {session: false, scope:['email', 'profile', 'mobile']}),validation.fbLogin, controller.fbLogin);

router.post('/login/google',validation.googleLogin, controller.googleLogin);

router.post('/signup', validation.signup, controller.signup);

router.post('/signup/fb', passport.authenticate('facebook-token', {session:false}),validation.fbSignup, controller.fbSignup);

router.post('/signup/google', validation.googleSignup, controller.googleSignup);

router.post('/admin/addConsumer', validation.addConsumer, controller.addConsumer);

//get
router.post('/logout', controller.logout);

router.put('/resetPassword',validation.resetPassword, controller.resetPassword);

//get
router.post('/bookingHistory', validation.bookingHistory, controller.bookingHistory);

router.put('/addPushToken', validation.addToken, controller.addToken);


//get
router.post('/profileDetail', validation.profileGet, controller.profileGet);

router.post('/profile', validation.profileUpdate, controller.profileUpdate);

router.post('/profile/admin', validation.adminProfileUpdate, controller.adminProfileUpdate);

router.post('/profileImage', controller.updateProfileImage);
router.post('/profileImage/admin',validation.adminUpdateProfileImage, controller.adminUpdateProfileImage);


router.post('/suggestion', validation.addSuggestion, controller.addSuggestion);
router.get('/suggestion', validation.getSuggestion, controller.getSuggestion);

//profile update



//get
router.post('/notification', validation.notification, controller.notification);

router.post('/notification/all',validation.getAllNotification, controller.getAllNotification);

router.post('/notification/send', validation.sendNotification, controller.sendNotification);

router.post('/preferredLocation', validation.addPreferredLocation, controller.addPreferredLocation);

//get
router.post('/location', validation.getPreferredLocation, controller.getPreferredLocation);

//get
router.post('/downloadImage',validation.downloadImage, controller.downloadImage);
router.get('/downloadImage/:image', controller.getImage);

router.post('/filtered', controller.filtered);

router.get('/customer/excel', controller.getExcel);

router.get('/userType', controller.getUserType);

//feedback
router.post('/feedback', validation.setFeedback, controller.setFeedback);

router.get('/feedback', controller.getFeedback);

//rating
router.post('/rating', validation.setRating, controller.setRating);

router.get('/rating', controller.getRating);

router.post('/sos', validation.sos, controller.sos);


//dashboard
router.get('/dashboard', controller.getDashboard);



router.post('/all', controller.all);

router.get('/:id', controller.getUser);

router.post('/checkSuperAdmin', controller.checkSuperAdmin);

module.exports = router;
const jwtService = require('./jwtServices');
const bcryptService = require('./bcryptService');
const googleService = require('./googleAdmin');
const paymentService = require('./payment');
const emailService = require('./emailService');
const fbService = require('./fbService');
const googleSignIn = require('./googelSigninService');

module.exports = {
    jwtService,
    bcryptService,
    googleService,
    paymentService,
    emailService,
    fbService,
    googleSignIn
}
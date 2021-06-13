const constant = require('../../core/constants');

const userModule = require('../User');
const pointModule = require('../Point');
const vehicleModule = require('../Vehicle');
const driverModule = require("../Driver");
const routeModule = require("../Route");
const tripModule = require('../Trip');
const bookingModule = require('../Booking');
const passModule = require('../Pass');
const tripBooking = require('../TripBooking');
 
module.exports = function(app){
    app.use(constant.path.user, userModule);
    app.use(constant.path.point, pointModule);
    app.use(constant.path.vehicle, vehicleModule);
    app.use(constant.path.driver, driverModule);
    app.use(constant.path.route, routeModule);
    app.use(constant.path.trip, tripModule);
    app.use(constant.path.booking, bookingModule);
    app.use(constant.path.pass, passModule);
    app.use(constant.path.tripBooking, tripBooking);
};

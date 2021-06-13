// const Sequelize = require('sequelize');
// const sequelize = require('../../db').sequelize;
// const User = require('../dataModels/user/userModel');

// class Booking extends Sequelize.Model{}

// Booking.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     price: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     seatsBooked:{
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     pickupTime: {
//         type: Sequelize.DATE,
//         allowNull: true
//     },
//     dropTime: {
//         type: Sequelize.DATE,
//         allowNull:true
//     },
//     status:{
//         type: Sequelize.ENUM,
//         values:[BookingStatus.pending, BookingStatus.completed, BookingStatus.cancel, BookingStatus.failed, BookingStatus.refund],
//         defaultValue: BookingStatus.pending
//     },
//     rideStatus:{
//         type: Sequelize.ENUM,
//         values: [RideStatus.notBooked, RideStatus.pending, RideStatus.prematureCancel, RideStatus.arrived, RideStatus.notArrived, RideStatus.departed],
//         defaultValue: RideStatus.notBooked
//     },
//     orderId: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// },{
//     sequelize,
//     modelName: 'booking',
//     createdAt: true,
//     updatedAt: true
// });


// Booking.belongsTo(User);
// Booking.belongsTo(Driver, {allowNull: true});
// Booking.belongsTo(Vehicle, {allowNull: true});
// Booking.belongsTo(Point, {as: "sourcePoint"});
// Booking.belongsTo(Point, {as: "destinationPoint"});
// Booking.belongsTo(Trip);
// Booking.belongsTo(TripBooking);

// // Booking.sync().catch(function(error){
//     // console.log('Booking table not created');
// // })

// module.exports = Booking;
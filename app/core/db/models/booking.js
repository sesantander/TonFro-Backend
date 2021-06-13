'use strict';

const {BookingStatus, RideStatus} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    price: {
      type: DataTypes.FLOAT,
      defaultValue:0
    },
    seatsBooked: DataTypes.INTEGER,
    pickupTime: DataTypes.DATE,
    dropTime: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM,
      values:[BookingStatus.pending, BookingStatus.completed, BookingStatus.cancel, BookingStatus.failed, BookingStatus.refund],
      defaultValue: BookingStatus.pending
  },
    rideStatus: {
      type: DataTypes.ENUM,
      values: [RideStatus.notBooked, RideStatus.pending, RideStatus.prematureCancel, RideStatus.arrived, RideStatus.notArrived, RideStatus.departed],
      defaultValue: RideStatus.notBooked
  },
    orderId: DataTypes.STRING,
    isBookingForOther: DataTypes.BOOLEAN,
    nameBookedFor: DataTypes.STRING,
    mobileBookedFor: DataTypes.STRING,
    payMethod: DataTypes.STRING,
    isCash: DataTypes.BOOLEAN,
    isOnline: DataTypes.BOOLEAN,
    isPass:DataTypes.BOOLEAN,
    isAdmin:DataTypes.BOOLEAN,
    isUpdated:DataTypes.BOOLEAN,
    travelDate:DataTypes.DATEONLY
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    Booking.belongsTo(models.Driver, {allowNull: true, as:'driver', foreignKey: 'driverId'});
    Booking.belongsTo(models.Vehicle, {allowNull: true, as:'vehicle', foreignKey:'vehicleId'});
    Booking.belongsTo(models.Point, {foreignKey: 'sourcePointId', as: 'sourcePoint'});
    Booking.belongsTo(models.Point, {foreignKey: 'destinationPointId', as: 'destinationPoint'});
    Booking.belongsTo(models.Trip, {foreignKey: 'tripId', as: 'trip'});
    Booking.belongsTo(models.TripBooking , {foreignKey:'tripBookingId',targetKey:'id' ,  as:'tripBooking'});
    Booking.belongsTo(models.Booking, {foreignKey:'upgradeToId', targetKey:'id', as:'upgradeTo'});
    Booking.belongsTo(models.Booking, {foreignKey:'upgradeFromId', targetKey:'id', as:'upgradeFrom'});
    Booking.belongsTo(models.UserPass, {foreignKey:'userPassId', targetKey:'id', as:'userPass'});
  };
  return Booking;
};
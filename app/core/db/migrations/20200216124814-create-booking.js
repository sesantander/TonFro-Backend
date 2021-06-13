'use strict';

const {BookingStatus, RideStatus} = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      seatsBooked: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      pickupTime: {
        type: Sequelize.DATE
      },
      dropTime: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values:[BookingStatus.pending, BookingStatus.completed, BookingStatus.cancel, BookingStatus.failed, BookingStatus.refund],
        defaultValue: BookingStatus.pending
      },
      rideStatus: {
        type: Sequelize.ENUM,
        values: [RideStatus.notBooked, RideStatus.pending, RideStatus.prematureCancel, RideStatus.arrived, RideStatus.notArrived, RideStatus.departed],
        defaultValue: RideStatus.notBooked
      },
      orderId: {
        type: Sequelize.STRING
      },
      isBookingForOther: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      nameBookedFor: {
        type: Sequelize.STRING
      },
      mobileBookedFor: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Users',
          key:'id',
          as:'userId'
        }
      },
      driverId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        onDelete:'SET NULL',
        references:{
          model:'Drivers',
          key:'id',
          as:'driverId'
        }
      },
      vehicleId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        onDelete:'SET NULL',
        references:{
          model:'Vehicles',
          key:'id',
          as:'vehicleId'
        }
      },
      sourcePointId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Points',
          key:'id',
          as:'sourcePointId'
        }
      },
      destinationPointId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Points',
          key:'id',
          as:'destinationPointId'
        }
      },
      tripId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Trips',
          key:'id',
          as:'tripId'
        }
      },
      tripBookingId:{
        type:Sequelize.INTEGER,
        allowNull: true,
        onDelete:'SET NULL',
        references:{
          model:'TripBookings',
          key:'id',
          as:'tripBookingId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};
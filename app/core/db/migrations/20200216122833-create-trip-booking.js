'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TripBookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      maxSeat: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      date: {
        type: Sequelize.DATEONLY,
        primaryKey:true,
        defaultValue: new Date('01/01/1901')
      },
      currentBooked: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      tripId:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'Trips',
          key:'id',
          as:'tripId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TripBookings');
  }
};
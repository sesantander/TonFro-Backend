'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TripTimings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.TIME,
        allowNull:false
      },
      tripId:{
          allowNull: false,
          primaryKey: true,
          unique:'uniqueTripTime',
          type: Sequelize.INTEGER,
          references:{
              model: 'Trips',
              key:'id',
              as:'tripId'
          }
      },
      pointId:{
          allowNull: false,
          primaryKey: true,
          unique:'uniqueTripTime',
          type: Sequelize.INTEGER,
          references:{
              model: 'Points',
              key:'id',
              as:'pointId'
          }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TripTimings');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PassTrips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      passId:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        references:{
          model: 'Passes',
          key:'id',
          as:'passId'
        }
      },
      tripId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model: 'Trips',
          key:'id',
          as:'tripId'
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PassTrips');
  }
};
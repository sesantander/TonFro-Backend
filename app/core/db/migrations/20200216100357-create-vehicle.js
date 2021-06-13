'use strict';

const {VehicleServiceType} = require('../../constants');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      engineNumber: {
        type: Sequelize.STRING
      },
      vehicleNumber: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      maxSeat: {
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      service_type: {
        type: Sequelize.ENUM(VehicleServiceType.daily)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      driverId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        onDelete:'SET NULL',
        references:{
          model: 'Drivers',
          key:'id',
          as:'driverId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Vehicles');
  }
};
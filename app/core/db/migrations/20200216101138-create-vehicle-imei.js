'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VehicleImeis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imei: {
        type: Sequelize.STRING,
        primaryKey:true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VehicleImeis');
  }
};
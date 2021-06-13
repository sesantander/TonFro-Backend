'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maxSeat: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      startTime: {
        type: Sequelize.TIME
      },
      name: {
        type: Sequelize.STRING
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
      routeId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:'cascade',
        references:{
          model:'Routes',
          key:'id',
          as:'routeId'
        }
      },
      startingPointId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:'cascade',
        references:{
          model:'Points',
          key:'id',
          as:'startingPointId'
        }
      },
      destinationPointId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        onDelete:'cascade',
        references:{
          model:'Points',
          key:'id',
          as:'destinationPointId'
      }
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};
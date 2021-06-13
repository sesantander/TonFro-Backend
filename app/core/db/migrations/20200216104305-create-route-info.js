'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RouteInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeIndex: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:true
      },
      pointId:{
        type:Sequelize.INTEGER,
        onDelete:'cascade',
        references:{
          model:'Points',
          key:'id',
          as:'pointId'
        }
      },
      routeId:{
        type:Sequelize.INTEGER,
        onDelete:'cascade',
        references:{
          model:'Routes',
          key:'id',
          as:'routeId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RouteInfos');
  }
};
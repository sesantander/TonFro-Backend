'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PassPoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      passId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          references:{
            model: 'Passes',
            key:'id',
            as:'passId'
          }
        },
        pointId:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          references:{
            model: 'Points',
            key:'id',
            as:'pointId'
          }
        },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PassPoints');
  }
};
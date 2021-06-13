'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AdminNotifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payload: {
        type: Sequelize.STRING,
        allowNull:false
      },
      severity: {
        type: Sequelize.INTEGER,
        defaultValue:10
      },
      isFullfilled: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      reportedFromId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        onDelete:'SET NULL',
        references:{
          model:'Users',
          key:'id',
          as:'reportedFromId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AdminNotifications');
  }
};
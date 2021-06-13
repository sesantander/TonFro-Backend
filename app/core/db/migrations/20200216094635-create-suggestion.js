'use strict';

const {Shift} = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Suggestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shift: {
        type: Sequelize.ENUM(Shift.morning, Shift.evening)
      },
      time: {
        type: Sequelize.TIME,
        allowNull:false
      },
      point: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references:{
          model: 'Users',
          key:'id',
          as:'userId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Suggestions');
  }
};
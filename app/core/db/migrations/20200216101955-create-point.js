'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Points', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lat: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true,
        unique:'uniqueLatLong'
      },
      long: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true,
        unique:'uniqueLatLong'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Points');
  }
};
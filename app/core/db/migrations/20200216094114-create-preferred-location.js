'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PreferredLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId:{
        type: Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model: 'Users',
          key:'id',
          as:'userId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PreferredLocations');
  }
};
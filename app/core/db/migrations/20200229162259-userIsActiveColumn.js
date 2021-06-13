'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'isActive',
      {
        type: Sequelize.BOOLEAN,
        defaultValue:true 
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'isActive'
    );
  }
};

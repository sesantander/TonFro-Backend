'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Points','updatedAt', {
      type: Sequelize.DATE,
      allowNull:false,
      defaultValue: new Date()
    } );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Points', 'updatedAt');
  }

};

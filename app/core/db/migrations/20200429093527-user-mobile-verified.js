'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users','mobileVerified', {
      type: Sequelize.BOOLEAN,
      allowNull:false,
      defaultValue: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'mobileVerified');
  }

};

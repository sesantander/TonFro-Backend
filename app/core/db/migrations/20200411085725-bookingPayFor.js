'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Bookings','payMethod', {
      type: Sequelize.STRING,
      defaultValue: 'online'
    } );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Bookings','payMethod');
  }
};

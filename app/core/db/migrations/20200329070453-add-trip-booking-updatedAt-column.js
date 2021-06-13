'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('TripBookings','updatedAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      }),
  
      queryInterface.addColumn('TripBookings','createdAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('TripBookings','updatedAt'),
      queryInterface.removeColumn('TripBookings','createdAt')
    ]);
  }
};

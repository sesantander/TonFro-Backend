'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('Trips','updatedAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      }),
  
      queryInterface.addColumn('Trips','createdAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      })
    ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Trips','updatedAt'),
      queryInterface.removeColumn('Trips','createdAt')
    ]);
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('Routes','updatedAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      }),
  
      queryInterface.addColumn('Routes','createdAt', {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: new Date()
      })
    ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Routes','updatedAt'),
      queryInterface.removeColumn('Routes','createdAt')
    ]);
  }
};

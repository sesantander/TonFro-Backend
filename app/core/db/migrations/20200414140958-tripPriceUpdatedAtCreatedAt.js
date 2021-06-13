'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.addColumn('Prices','updatedAt', {
          type: Sequelize.DATE,
          allowNull:false,
          defaultValue: new Date()
        }, {transaction:t}),
    
        // queryInterface.addColumn('Prices','createdAt', {
        //   type: Sequelize.DATE,
        //   allowNull:false,
        //   defaultValue: new Date()
        // }, {transaction:t})
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.removeColumn('Prices','updatedAt'),
        // queryInterface.removeColumn('Prices','createdAt')
      ]);
    });
  }
};

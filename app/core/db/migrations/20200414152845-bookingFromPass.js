'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([

        queryInterface.addColumn('Bookings','userPassId', {
          type:Sequelize.INTEGER,
          onDelete:'SET NULL',
          references:{
            model:'UserPasses',
            key:'id',
            as:'userPassId'
          }
        }, {transaction: t})
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.removeColumn('Bookings','userPassId', {transaction: t})
      ]);
    });
  }
};

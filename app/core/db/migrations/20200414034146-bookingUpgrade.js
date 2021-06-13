'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([

        queryInterface.addColumn('Bookings','upgradeFromId', {
          type:Sequelize.INTEGER,
          onDelete:'SET NULL',
          references:{
            model:'Bookings',
            key:'id',
            as:'upgradeFromId'
          }
        }, {transaction: t}),

        queryInterface.addColumn('Bookings', 'upgradeToId',{
          type:Sequelize.INTEGER,
          onDelete:'SET NULL',
          references:{
            model:'Bookings',
            key:'id',
            as:'upgradeToId'
          }
        }, {transaction: t}),

        queryInterface.addColumn('Bookings', 'isUpdated',{
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, {transaction: t}),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.removeColumn('Bookings','upgradeFromId', {transaction: t}),
        queryInterface.removeColumn('Bookings','upgradeToId', {transaction: t}),
        queryInterface.removeColumn('Bookings','isUpdated', {transaction: t})
      ]);
    });
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([

        queryInterface.addColumn('Bookings','isPass', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, {transaction: t}),


        queryInterface.addColumn('Bookings', 'isOnline',{
          type: Sequelize.BOOLEAN,
          defaultValue: true
        }, {transaction: t}),

        queryInterface.addColumn('Bookings', 'isCash',{
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, {transaction: t}),
        
        queryInterface.addColumn('Bookings', 'isAdmin',{
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, {transaction: t})
        
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t)=>{
      return Promise.all([
        queryInterface.removeColumn('Bookings','isPass', {transaction: t}),
        queryInterface.removeColumn('Bookings','isOnline', {transaction: t}),
        queryInterface.removeColumn('Bookings','isCash', {transaction: t}),
        queryInterface.removeColumn('Bookings','isAdmin', {transaction: t})
      ]);
    });
  }
};

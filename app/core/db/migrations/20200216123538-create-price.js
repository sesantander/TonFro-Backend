'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Prices', {
      price: {
        type: Sequelize.FLOAT,
        defaultValue:0.0
      },
      date: {
        type: Sequelize.DATEONLY,
        primaryKey:true,
        unique:'tripPrice',
        defaultValue: new Date('01/01/1901')
      },
      tripId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        primaryKey:true,
        unique:'tripPrice',
        references:{
          model:'Trips',
          key:'id',
          as:'tripId'
        }
      },
      fromId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        unique:'tripPrice',
        references:{
          model:'Points',
          key:'id',
          as:'fromId'
        }
      },

      toId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        unique:'tripPrice',
        references:{
          model:'Points',
          key:'id',
          as:'toId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Prices');
  }
};
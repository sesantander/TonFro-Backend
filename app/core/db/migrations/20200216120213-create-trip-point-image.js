'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TripPointImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      tripId:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        primaryKey: true,
        references:{
          model: 'Trips',
          key:'id',
          as:'tripId'
        }
      },

      pointId:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        primaryKey:true,
        references:{
          model: 'Points',
          key:'id',
          as:'pointId'
        }
      },

      pointImageId:{
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        primaryKey:true,
        references:{
          model: 'PointImages',
          key:'id',
          as:'pointImageId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TripPointImages');
  }
};
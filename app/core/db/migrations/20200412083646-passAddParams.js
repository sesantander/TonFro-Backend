'use strict';

const {PassStatus} = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.addColumn('Passes','description', {
        type: Sequelize.STRING,
        defaultValue: ""
      }),
  
      queryInterface.addColumn('Passes','maxDiscPerRide', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      }),


      queryInterface.addColumn('Passes','discPerRidePercentage', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      }),

      
      queryInterface.addColumn('Passes','isSuspended', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),

      queryInterface.addColumn('Passes','isDynamic', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }),
      

      queryInterface.addColumn('Passes','isForAllPoint', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }),


      queryInterface.addColumn('Passes','isForAllTrip', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }),


      queryInterface.addColumn('Passes','maxPassPriceDisc', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      }),


      queryInterface.addColumn('Passes','passPriceDiscPercentage', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Passes','description'),
      queryInterface.removeColumn('Passes','maxDiscPerRide'),
      queryInterface.removeColumn('Passes','discPerRidePercentage'),
      queryInterface.removeColumn('Passes','isSuspended'),
      queryInterface.removeColumn('Passes','isDynamic'),
      queryInterface.removeColumn('Passes','isForAllPoint'),
      queryInterface.removeColumn('Passes','isForAllTrip'),
      queryInterface.removeColumn('Passes','maxPassPriceDisc'),
      queryInterface.removeColumn('Passes','passPriceDiscPercentage')
    ]);
  }
};

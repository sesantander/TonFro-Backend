'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.addColumn('UserPasses','name', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:""
      }),
  
      queryInterface.changeColumn('UserPasses', 'validUpto',{
        type: Sequelize.DATEONLY,
        allowNull: true
      }),

      queryInterface.addColumn('UserPasses','validity', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),


      queryInterface.addColumn('UserPasses','description', {
        type: Sequelize.STRING,
        defaultValue: ""
      }),

      
      queryInterface.addColumn('UserPasses','maxDiscPerRide', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      }),

      queryInterface.addColumn('UserPasses','maxDiscPerRidePercentage', {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      }),
      

      queryInterface.addColumn('UserPasses','isForAllPoint', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }),


      queryInterface.addColumn('UserPasses','isForAllJourney', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }),


      queryInterface.addColumn('UserPasses','activateAt', {
        type: Sequelize.DATEONLY,
      }),


      queryInterface.addColumn('UserPasses','points', {
        type: Sequelize.STRING,
        defaultValue: ""
      }),


      queryInterface.addColumn('UserPasses','trips', {
        type: Sequelize.STRING,
        defaultValue: ""
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserPasses','name'),
      queryInterface.changeColumn('UserPasses', 'validUpto',{
        type: Sequelize.DATEONLY,
        allowNull: false
      }),
      queryInterface.removeColumn('UserPasses','validity'),
      queryInterface.removeColumn('UserPasses','description'),
      queryInterface.removeColumn('UserPasses','maxDiscPerRide'),
      queryInterface.removeColumn('UserPasses','maxDiscPerRidePercentage'),
      queryInterface.removeColumn('UserPasses','isForAllPoint'),
      queryInterface.removeColumn('UserPasses','isForAllJourney'),
      queryInterface.removeColumn('UserPasses','activateAt'),
      queryInterface.removeColumn('UserPasses','points'),
      queryInterface.removeColumn('UserPasses','trips'),
    ]);
  }
};

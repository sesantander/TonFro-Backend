'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn('RouteInfos','distanceFromPrev', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }),
  
      queryInterface.addColumn('RouteInfos','timeFromPrev', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('RouteInfos','distanceFromPrev'),
      queryInterface.removeColumn('RouteInfos','timeFromPrev')
    ]);
  }
};

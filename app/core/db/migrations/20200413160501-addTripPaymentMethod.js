'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Trips','payBy', {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue: JSON.stringify(['razorPay', 'pass'])
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Trips','payBy');
  }
};

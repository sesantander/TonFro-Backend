"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Bookings",
          "travelDate",
          {
            type: Sequelize.DATEONLY,
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Bookings", "travelDate", {
          transaction: t,
        }),
      ]);
    });
  },
};

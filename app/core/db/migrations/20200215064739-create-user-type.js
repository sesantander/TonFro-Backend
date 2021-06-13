'use strict';
const {UserTypeENUM} = require('../../constants');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM(UserTypeENUM.admin, UserTypeENUM.user, UserTypeENUM.driver),
        allowNull: false,
      },
      accessLevel: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserTypes');
  }
};
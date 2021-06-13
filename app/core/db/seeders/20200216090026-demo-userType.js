'use strict';

const {UserTypeENUM} = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('UserTypes',[
     {
        name: UserTypeENUM.admin,
        accessLevel: 10,
     },
     {
        name: UserTypeENUM.user,
        accessLevel: 4,
     },
     {
        name: UserTypeENUM.driver,
        accessLevel: 2,
     }
   ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserTypes', null, {});
  }
};

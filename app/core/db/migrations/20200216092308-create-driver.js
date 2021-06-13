'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProofName: {
        type: Sequelize.STRING
      },
      idProofNumber: {
        type: Sequelize.STRING
      },
      idProofVerified: {
        type: Sequelize.BOOLEAN
      },
      idProofImage: {
        type: Sequelize.STRING
      },
      addProofName: {
        type: Sequelize.STRING
      },
      addProofNumber: {
        type: Sequelize.STRING
      },
      addProofVerified: {
        type: Sequelize.BOOLEAN
      },
      addProofImage: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      userId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'Users',
          key:'id',
          as:'userId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Drivers');
  }
};
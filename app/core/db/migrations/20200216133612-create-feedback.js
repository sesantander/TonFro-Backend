'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      msg: {
        type: Sequelize.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Users',
          key:'id',
          as:'userId'
        }
      },
      tripId:{
        type:Sequelize.INTEGER,
        onDelete:'SET NULL',
        references:{
          model:'Trips',
          key:'id',
          as:'tripId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Feedbacks');
  }
};
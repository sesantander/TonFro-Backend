'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PointImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        allowNull:false
      },
      pointId:{
        type: Sequelize.INTEGER,
        onDelete:'cascade',
        references:{
          model: 'Points',
          key:'id',
          as:'pointId'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PointImages');
  }
};
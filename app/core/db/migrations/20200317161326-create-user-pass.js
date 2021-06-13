'use strict';

const {PaymentStatus} = require('../../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserPasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      validUpto: {
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      tripConsume: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      tripAllowed: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      orderStatus: {
        type: Sequelize.ENUM,
        values:[PaymentStatus.pending, PaymentStatus.cancel, PaymentStatus.failed, PaymentStatus.completed, PaymentStatus.refundInitiated, PaymentStatus.refund],
        defaultValue: PaymentStatus.pending
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue:0
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      passId:{
          type: Sequelize.INTEGER,
          onDelete:'SET NULL',
          references:{
            model: 'Passes',
            key:'id',
            as:'passId'
          }
        },
        userId:{
          type: Sequelize.INTEGER,
          onDelete:'SET NULL',
          references:{
            model: 'Users',
            key:'id',
            as:'userId'
          }
        },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserPasses');
  }
};
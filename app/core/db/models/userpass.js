'use strict';
const {PaymentStatus} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const UserPass = sequelize.define('UserPass', {
    // id:DataTypes.INTEGER,
    name:DataTypes.STRING,
    validUpto: DataTypes.DATEONLY,
    tripConsume: DataTypes.INTEGER,
    tripAllowed: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    orderStatus:{
      type: DataTypes.ENUM,
      values:[PaymentStatus.pending, PaymentStatus.completed, PaymentStatus.cancel, PaymentStatus.failed, PaymentStatus.refund, PaymentStatus.refundInitiated],
      defaultValue: PaymentStatus.pending
    },
    price: DataTypes.FLOAT,
    orderId: DataTypes.STRING,
    validity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    maxDiscPerRide: DataTypes.FLOAT,
    maxDiscPerRidePercentage: DataTypes.FLOAT,
    isForAllPoint: DataTypes.BOOLEAN,
    isForAllJourney: DataTypes.BOOLEAN,
    activateAt: DataTypes.DATEONLY,
    points: DataTypes.STRING,
    trips: DataTypes.STRING,
    code:DataTypes.STRING,
    
  }, {});
  UserPass.associate = function(models) {
    
    UserPass.belongsTo(models.Pass, {foreignKey: 'passId', as: 'pass'});
    UserPass.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    // UserPass.belongsTo(models.Point, {foreignKey: 'pointBegin', as: 'pointStart'});
    // UserPass.belongsTo(models.Point, {foreignKey: 'pointEnd', as: 'pointStop'});
    
  };
  return UserPass;
};
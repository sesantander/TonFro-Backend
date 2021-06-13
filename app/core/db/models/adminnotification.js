'use strict';
module.exports = (sequelize, DataTypes) => {
  const AdminNotification = sequelize.define('AdminNotification', {
    payload: DataTypes.STRING,
    severity: DataTypes.INTEGER,
    isFullfilled: DataTypes.BOOLEAN
  }, {});
  AdminNotification.associate = function(models) {
    AdminNotification.belongsTo(models.User, {foreignKey: 'reportedFromId',targetKey:'id', as: 'reportedFrom', allowNull:true});
    // associations can be defined here
  };
  return AdminNotification;
};
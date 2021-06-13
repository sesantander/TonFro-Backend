'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    date: DataTypes.DATE,
    payload: DataTypes.STRING
  }, {
    updatedAt:false
  });
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, {as:'user', foreignKey:'userId'});
  };
  return Notification;
};
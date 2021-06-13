'use strict';
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    name: DataTypes.STRING
  }, {});
  Session.associate = function(models) {
    // associations can be defined here
    Session.belongsTo(models.User, {as:'user', foreignKey:'userId'});
  };
  return Session;
};
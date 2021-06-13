'use strict';
const {UserTypeENUM} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    name: DataTypes.ENUM(UserTypeENUM.admin, UserTypeENUM.driver, UserTypeENUM.user),
    accessLevel: DataTypes.INTEGER
  }, {
    timestamps:false
  });
  UserType.associate = function(models) {
    // associations can be defined here
        // UserType.hasOne(models.User);
  };
  return UserType;
};
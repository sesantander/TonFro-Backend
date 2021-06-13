'use strict';
const {Gender} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    emailVerified:{
      type:  DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      values: [Gender.male, Gender.female]
    },
    image: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deviceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userTypeId: DataTypes.INTEGER,
    pushToken: DataTypes.STRING,
    isActive:DataTypes.BOOLEAN,
    mobileVerified: DataTypes.BOOLEAN
  }, {
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.UserType, {as:'userType'});
    // User.hasOne(models.Driver);
    // User.hasMany(models.Notification);
    // User.hasMany(models.Suggestion);
    // User.hasMany(models.Rating);
    // User.hasMany(models.Booking);
    // User.hasMany(models.Feedback);
  };
  return User;
};
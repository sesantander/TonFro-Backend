'use strict';
module.exports = (sequelize, DataTypes) => {
  const Route = sequelize.define('Route', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
    }
  }, {
  });
  Route.associate = function(models) {
    // associations can be defined here
    // Route.hasMany(models.RouteInfo);
    // Route.hasMany(models.Trip);
  };
  return Route;
};
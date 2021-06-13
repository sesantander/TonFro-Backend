'use strict';
module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:'uniqueLatLong'
    },
    long: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:'uniqueLatLong'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    updatedAt: false
  });
  Point.associate = function(models) {
    // associations can be defined here
    // Point.hasMany(models.PointImage);
    // Point.hasMany(models.RouteInfo, );
    // Point.hasMany(models.Trip);
    // Point.hasMany(models.TripTiming);
    // Point.hasMany(models.TripPointImage);
    // Point.hasMany(models.Booking);
  };
  return Point;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const TripTiming = sequelize.define('TripTiming', {
    time: {
      type: DataTypes.TIME,
      allowNull:false
    }
  }, {
    timestamps:false
  });
  TripTiming.associate = function(models) {
    // associations can be defined here
    TripTiming.belongsTo(models.Trip, {as:'trip', unique:'uniqueTripTime',});
    TripTiming.belongsTo(models.Point, {as:'point', unique:'uniqueTripTime',});
  };
  return TripTiming;
};
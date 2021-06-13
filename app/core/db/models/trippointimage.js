'use strict';
module.exports = (sequelize, DataTypes) => {
  const TripPointImage = sequelize.define('TripPointImage', {
  }, {
    timestamps:false
  });
  TripPointImage.associate = function(models) {
    // associations can be defined here
    TripPointImage.belongsTo(models.Trip, {as:'trip'});
    TripPointImage.belongsTo(models.Point, {as:'point'});
    TripPointImage.belongsTo(models.PointImage ,{as: 'pointImage'});
  };
  return TripPointImage;
};
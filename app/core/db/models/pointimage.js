'use strict';
module.exports = (sequelize, DataTypes) => {
  const PointImage = sequelize.define('PointImage', {
    image: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    timestamps:false
  });
  PointImage.associate = function(models) {
    // associations can be defined here
    PointImage.belongsTo(models.Point, {as:'point', foreginKey:'pointId'});
    // PointImage.hasMany(models.TripPointImage);
  };
  return PointImage;
};
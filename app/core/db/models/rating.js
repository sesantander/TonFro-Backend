'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps:false
  });
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, {as:'user'});
  };
  return Rating;
};
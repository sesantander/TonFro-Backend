'use strict';
module.exports = (sequelize, DataTypes) => {
  const PassTrip = sequelize.define('PassTrip', {
    // id: DataTypes.INTEGER
  }, {
    timestamps:false
  });
  PassTrip.associate = function(models) {
    // associations can be defined here
    PassTrip.belongsTo(models.Pass, {as:'pass'});
    PassTrip.belongsTo(models.Trip, {as:'trip'});
  };
  return PassTrip;
};
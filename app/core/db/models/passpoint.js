'use strict';
module.exports = (sequelize, DataTypes) => {
  const PassPoint = sequelize.define('PassPoint', {
    // id: DataTypes.INTEGER
  }, {});
  PassPoint.associate = function(models) {
    // associations can be defined here
    PassPoint.belongsTo(models.Pass, {as:'pass'});
    PassPoint.belongsTo(models.Point, {as:'point'});
  };
  return PassPoint;
};
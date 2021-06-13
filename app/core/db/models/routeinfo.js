'use strict';
module.exports = (sequelize, DataTypes) => {
  const RouteInfo = sequelize.define('RouteInfo', {
    routeIndex: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    distanceFromPrev:DataTypes.INTEGER,
    timeFromPrev: DataTypes.INTEGER
  }, {
    timestamps:false
  });
  RouteInfo.associate = function(models) {
    // associations can be defined here
    RouteInfo.belongsTo(models.Point , {as: 'point', foreignKey:'pointId'});
    RouteInfo.belongsTo(models.Route, {as:'route', foreignKey:'routeId'});
  };
  return RouteInfo;
};
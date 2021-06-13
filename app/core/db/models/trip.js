'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    maxSeat: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    isActive:{
      type:  DataTypes.BOOLEAN,
      defaultValue:false
    },
    startTime: DataTypes.TIME,
    name: DataTypes.STRING,
    payBy: DataTypes.STRING
  }, {
    
  });
  Trip.associate = function(models) {
    // associations can be defined here
    Trip.belongsTo(models.Vehicle, {allowNull:true, as:'vehicle'});
    Trip.belongsTo(models.Route, {as:'route'});
    Trip.belongsTo(models.Point, {as: 'startingPoint', foreignKey:'startingPointId'});
    Trip.belongsTo(models.Point, {as: 'destinationPoint', foreignKey: 'destinationPointId'});
  };
  return Trip;
};
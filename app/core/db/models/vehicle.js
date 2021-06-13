'use strict';

const {VehicleServiceType} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    title: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    engineNumber: DataTypes.STRING,
    vehicleNumber: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    maxSeat: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    service_type: DataTypes.ENUM(VehicleServiceType.daily)
  }, {
    
  });
  Vehicle.associate = function(models) {
    // associations can be defined here
    Vehicle.belongsTo(models.Driver, {allowNull:true, as:'driver'});
    // Vehicle.hasOne(models.VehicleImei);
    // Vehicle.hasMany(models.Trip);
    // Vehicle.hasMany(models.Booking);
  };
  return Vehicle;
};
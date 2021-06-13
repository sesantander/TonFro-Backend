'use strict';
module.exports = (sequelize, DataTypes) => {
  const VehicleImei = sequelize.define('VehicleImei', {
    id:DataTypes.INTEGER,
    imei: {
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });
  VehicleImei.associate = function(models) {
    // associations can be defined here
    VehicleImei.belongsTo(models.Vehicle, {allowNull:true, as:'vehicle', foreignKey:'vehicleId'});
  };
  return VehicleImei;
};
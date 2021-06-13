'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pass = sequelize.define('Pass', {
   // id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    trips: DataTypes.INTEGER,
    validity: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    isSuspended: DataTypes.BOOLEAN,
    isDynamic: DataTypes.BOOLEAN,
    isForAllPoint: DataTypes.BOOLEAN,
    isForAllTrip: DataTypes.BOOLEAN,
    discPerRidePercentage:DataTypes.FLOAT,
    additionalBenefit: DataTypes.BOOLEAN,
    code:DataTypes.STRING
  }, {});
  Pass.associate = function(models) {
    // associations can be defined here
  };
  return Pass;
};
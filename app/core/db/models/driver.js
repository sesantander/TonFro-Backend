'use strict';
module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    idProofName: DataTypes.STRING,
    idProofNumber: DataTypes.STRING,
    idProofVerified: DataTypes.BOOLEAN,
    idProofImage: DataTypes.STRING,
    addProofName: DataTypes.STRING,
    addProofNumber: DataTypes.STRING,
    addProofVerified: DataTypes.BOOLEAN,
    addProofImage: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  }, {
    timestamps:false
  });
  Driver.associate = function(models) {
    // associations can be defined here
    Driver.belongsTo(models.User ,{as:'user'});
    // Driver.hasMany(models.Booking);
  };
  return Driver;
};
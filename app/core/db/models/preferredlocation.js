'use strict';
module.exports = (sequelize, DataTypes) => {
  const PreferredLocation = sequelize.define('PreferredLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
  timestamps:false
  });
  PreferredLocation.associate = function(models) {
    PreferredLocation.belongsTo(models.User, {as:'user'});
    // associations can be defined here
  };
  return PreferredLocation;
};
'use strict';
const {Shift} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  const Suggestion = sequelize.define('Suggestion', {
    shift: DataTypes.ENUM(Shift.morning, Shift.evening),
    time: {
      type: DataTypes.TIME,
      allowNull:false
    },
    point:{
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    updatedAt:false
  });
  Suggestion.associate = function(models) {
    // associations can be defined here
    Suggestion.belongsTo(models.User, {as:'user'});
  };
  return Suggestion;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    date: {
      type:DataTypes.DATE,
      allowNull:false
    },
    msg: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    updatedAt:false
  });
  Feedback.associate = function(models) {
    // associations can be defined here
    Feedback.belongsTo(models.User, {as:'user'});
    Feedback.belongsTo(models.Trip, {as: 'trip'});
  };
  return Feedback;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    price: {
      type: DataTypes.FLOAT,
      defaultValue:0.0
    },
    date: {
      type:DataTypes.DATEONLY,
      defaultValue:new Date('01/01/1901'),
      primaryKey:true,
      unique:'tripPrice',
    },
    tripId:{
      type:DataTypes.INTEGER,
      onDelete:'CASCADE',
      primaryKey:true,
      unique:'tripPrice',
      references:{
        model:'Trips',
        key:'id',
        as:'tripId'
      }
    },
    fromId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:'tripPrice',
      references:{
        model:'Points',
        key:'id',
        as:'fromId'
      }
    },

    toId:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:'tripPrice',
      references:{
        model:'Points',
        key:'id',
        as:'toId'
      }
    }
  }, {
  });
  Price.associate = function(models) {
    // associations can be defined here
    Price.belongsTo(models.Trip, {as:'trip', primaryKey:true, unique:'tripPrice'});
    Price.belongsTo(models.Point, {as: 'from', foreignKey:'fromId', primaryKey:true, unique:'tripPrice'});
    Price.belongsTo(models.Point, {as: 'to', foreignKey:'toId', primaryKey:true, unique:'tripPrice'});
  };
  return Price;
};
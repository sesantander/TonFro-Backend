'use strict';
module.exports = (sequelize, DataTypes) => {
  const TripBooking = sequelize.define('TripBooking', {
    //id:DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true
    },	 
    maxSeat: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    },
    date: {
      type: DataTypes.DATEONLY,
      //primaryKey:true,
      defaultValue:new Date('01/01/1901')
    },
    currentBooked: {
      type:DataTypes.INTEGER,
      defaultValue:0, 
      validate:{
        min:0
      }
    },
    isActive:{
      type:  DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    // timestamps: false
  });
  TripBooking.associate = function(models) {
    // associations can be defined here
    TripBooking.belongsTo(models.Trip, {as: 'trip'});
    // TripBooking.hasOne(models.Booking, {as: 'booking'});
  };
  return TripBooking;
};
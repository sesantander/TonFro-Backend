// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Trip = require('./tripModel');


// class TripBooking extends Sequelize.Model{}

// TripBooking.init({
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     maxSeat:{
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     date: {
//         type: Sequelize.DATEONLY,
//         primaryKey:true,
//         defaultValue: new Date('01/01/1901')
//     },
//     currentBooked: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false
//     },
//     tripId:{
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'trip',
//             key:'id'
//         }
//     }
// },{
//     sequelize,
//     modelName: 'tripBooking'
// });

// TripBooking.belongsTo(Trip);

// // TripBooking.sync().catch(function(error){
// //     console.log('trip booking table not created', error);
// // })

// module.exports = TripBooking;
// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Trip = require('./tripModel');
// const Point = require('../route/pointModel');

// class TripTiming extends Sequelize.Model{}

// TripTiming.init({
//     time: {
//         type: Sequelize.TIME,
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
//     },
//     pointId:{
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'point',
//             key:'id'
//         }
//     }    
// },{
//     sequelize,
//     modelName: 'tripTiming'
// });

// // TripTiming.belongsTo(Trip, {primaryKey: true
// // });

// // TripTiming.belongsTo(Point, {
// //     primaryKey: true
// // });

// // Trip.belongsToMany(Point, {through: TripTiming});
// // Point.belongsToMany(Trip, {through: TripTiming});

// // TripTiming.sync().catch(function(error){
// //     console.log('trip timing  table created');
// // })

// module.exports = TripTiming;
// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Vehicle = require('../user/vehicleModel');
// const Route = require('../route/routeModel');
// const Point = require('../route/pointModel');

// class Trip extends Sequelize.Model{}

// Trip.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false
//     },
//     // startingPoint:{
//     //     allowNull: false,
//     //     type: Sequelize.INTEGER,
//     //     references:{
//     //         model: 'point',
//     //         key:'id'
//     //     }
//     // },
//     // destinationPoint:{
//     //     allowNull: false,
//     //     type: Sequelize.INTEGER,
//     //     references:{
//     //         model: 'point',
//     //         key:'id'
//     //     }
//     // },
//     maxSeat: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0,
//         allowNull: false
//     }
//     ,
//     startTime:{
//         type: Sequelize.TIME,
//     },
//     name:{
//         type:Sequelize.STRING
//     }
// },{
//     sequelize,
//     modelName: 'trip'
// });

// Trip.belongsTo(Vehicle, {allowNull: false});
// Trip.belongsTo(Route);
// Trip.belongsTo(Point, {as: 'startingPoint', foreignKey: 'startingPointId'});
// Trip.belongsTo(Point, {as: 'destinationPoint', foreignKey: 'destinationPointId'});

// // Trip.sync().catch(function(error){
// //     console.log('Route table created');
// // })

// module.exports = Trip;
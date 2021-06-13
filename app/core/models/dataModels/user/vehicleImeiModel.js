// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Vehicle = require('./vehicleModel');


// class VehicleImei extends Sequelize.Model{}

// VehicleImei.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     imei:{
//         type: Sequelize.STRING,
//         primaryKey:true,
//         allowNull: false
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue:false
//     }
// },{
//     sequelize,
//     modelName: 'vehicleImei'
// });

// VehicleImei.belongsTo(Vehicle, {allowNull: true});

// // VehicleImei.sync().catch(function(error){
// //     console.log('Vehicle imei table not created', error);
// // })

// module.exports = VehicleImei;
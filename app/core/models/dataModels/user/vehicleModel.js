// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Driver = require('./driverModel');

// const serviceType = {
//     daily:"daily"
// };


// class Vehicle extends Sequelize.Model{}

// Vehicle.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     title: {
//         type: Sequelize.STRING,
//     },
//     brand: {
//         type: Sequelize.STRING,
//     },
//     model: {
//         type: Sequelize.STRING,
//     },
//     engineNumber: {
//         type: Sequelize.STRING,
//     },
//     vehicleNumber:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//     },
//     image:{
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     maxSeat:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false
//     },
//     service_type:{
//         type: Sequelize.ENUM,
//         values: [serviceType.daily],
//         allowNull: true
//     }
// },{
//     sequelize,
//     modelName: 'vehicle'
// });

// Vehicle.belongsTo(Driver, {allowNull:true});

// // Vehicle.sync().catch(function(error){
// //     console.log('Vehicle table not created', error);
// // })

// module.exports = Vehicle;
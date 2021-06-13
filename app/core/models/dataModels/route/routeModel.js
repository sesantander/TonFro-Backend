// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Vehicle = require('../user/vehicleModel');


// class Route extends Sequelize.Model{}

// Route.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'route'
// });

// // Route.belongsTo(Vehicle);

// // Route.sync().catch(function(error){
// //     console.log('Route table created');
// // })

// module.exports = Route;
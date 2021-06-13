// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');
// const Journey = require('../journey/tripModel');
// const Driver = require('./driverModel');
// const Vehicle = require('./vehicleModel');

// class Rating extends Sequelize.Model{}

// Rating.init({
//     rating:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'rating',
//     createdAt: true
// });

// Rating.belongsTo(User);
// // Rating.belongsTo(Journey);
// // Rating.belongsTo(Driver);
// // Rating.belongsTo(Vehicle);

// // Rating.sync().catch(function(error){
// //     console.log('notification table not created', error);
// // })

// module.exports = Rating;
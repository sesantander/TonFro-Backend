// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');


// class PreferredLocation extends Sequelize.Model{}

// PreferredLocation.init({
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     location: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     userId:{
//         allowNull: false,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'user',
//             key:'id'
//         }
//     }
// },{
//     sequelize,
//     modelName: 'preferredLocation',
//     createdAt: true
// });

// // PreferredLocation.sync().catch(function(error){
// //     console.log('location not created', error);
// // })

// module.exports = PreferredLocation;
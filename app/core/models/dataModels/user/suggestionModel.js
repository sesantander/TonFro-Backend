// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');


// class Suggestion extends Sequelize.Model{}

// let shift = {
//     morning: "Morning",
//     evening: "Evening"
// }

// Suggestion.init({
//     shift:{
//         type: Sequelize.ENUM,
//         values :[shift.morning, shift.evening]
//     },
//     time: {
//        type: Sequelize.TIME,
//        allowNull: false
//     },
//     point:{
//         type: Sequelize.STRING,
//         allowNull:false
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
//     modelName: 'suggestion',
//     createdAt: true
// });

// // Suggestion.sync().catch(function(error){
// //     console.log('suggestion table not created', error);
// // })

// module.exports = Suggestion;
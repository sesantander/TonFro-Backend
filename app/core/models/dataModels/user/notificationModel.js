// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');


// class Notification extends Sequelize.Model{}

// Notification.init({
//     date:{
//         type: Sequelize.DATE,
//         allowNull: false
//     },
//     payload: {
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
//     modelName: 'notification',
//     createdAt: true
// });

// // Notification.sync().catch(function(error){
// //     console.log('notification table not created', error);
// // })

// module.exports = Notification;
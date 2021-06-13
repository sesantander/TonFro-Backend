// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');
// const Journey = require('../journey/tripModel');

// class Feedback extends Sequelize.Model{}

// Feedback.init({
//     date:{
//         type: Sequelize.DATE,
//         allowNull: false
//     },
//     msg: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'feedback',
//     createdAt: true
// });

// Feedback.belongsTo(User);
// Feedback.belongsTo(Journey, {allowNull: true});


// // Feedback.sync().catch(function(error){
// //     console.log('notification table not created', error);
// // })

// module.exports = Feedback;
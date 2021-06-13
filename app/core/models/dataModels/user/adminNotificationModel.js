// // const Sequelize = require('sequelize');
// const {User, Sequelize, sequelize} = require('../../../db/models');
// // const User = require('./userModel');

// class AdminNotification extends Sequelize.Model{}

// AdminNotification.init({
//     payload: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     severity:{
//         type: Sequelize.INTEGER,
//         defaultValue: 10
//     },
//     isFullfilled:{
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     }
// },{
//     sequelize,
//     modelName: 'adminNotification',
//     timestamps: true,
// });

// AdminNotification.belongsTo(User, {foreignKey: 'reportedFromId', as: 'reportedFrom', allowNull: true});
// AdminNotification.sync().catch(function(error){
//     console.log('notification table not created', error);
// })

// module.exports = AdminNotification;
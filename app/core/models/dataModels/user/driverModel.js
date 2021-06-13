// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const User = require('./userModel');


// class Driver extends Sequelize.Model{}

// Driver.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     idProofName:{
//         type: Sequelize.STRING,
//     },
//     idProofNumber: {
//         type: Sequelize.STRING
//     },
//     idProofVerified: {
//         type: Sequelize.BOOLEAN
//     },
//     idProofImage:{
//         type: Sequelize.STRING
//     },
//     addProofName:{
//         type: Sequelize.STRING,
//     },
//     addProofNumber: {
//         type: Sequelize.STRING
//     },
//     addProofVerified: {
//         type: Sequelize.BOOLEAN
//     },
//     addProofImage:{
//         type: Sequelize.STRING
//     },
//     isActive:{
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false
//     }
// },{
//     sequelize,
//     modelName: 'driver'
// });

// Driver.belongsTo(User);

// // Driver.sync().catch(function(error){
// //     console.log('Driver table not created', error);
// // })

// module.exports = Driver;
// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;


// class Point extends Sequelize.Model{}

// Point.init({
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
//     lat:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: 'uniqueLatLong'
//     },
//     long:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: 'uniqueLatLong'
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: true
//     },
//     createdOn: {
//         type: Sequelize.DATE,
//         defaultValue: Date.now,
//         allowNull: false
//       }
// },{
//     sequelize,
//     modelName: 'point',
//     timestamps: true
// });

// // Point.sync().catch(function(error){
// //     console.log('Point table not created', error);
// // })

// module.exports = Point;
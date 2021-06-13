// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Point = require('./pointModel');

// class PointImage extends Sequelize.Model{}

// PointImage.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     image: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'pointImage',
// });


// PointImage.belongsTo(Point);

// // PointImage.sync().catch(function(error){
// //     console.log('Point table not created', error);
// // })

// module.exports = PointImage;
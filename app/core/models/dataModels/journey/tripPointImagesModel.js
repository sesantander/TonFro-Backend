// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Trip = require('./tripModel');
// const Point = require('../route/pointModel');
// const PointImage = require('../route/pointImageModel');

// class TripPointImage extends Sequelize.Model{}

// TripPointImage.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     }
// },{
//     sequelize,
//     modelName: 'tripPointImage'
// });


// TripPointImage.belongsTo(Trip);
// TripPointImage.belongsTo(Point);
// TripPointImage.belongsTo(PointImage);

// // TripPointImage.sync().catch(function(error){
// //     console.log('trip point image  table created');
// // })

// module.exports = TripPointImage;
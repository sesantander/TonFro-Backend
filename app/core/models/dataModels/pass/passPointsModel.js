// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;

// const Pass = require('./passModel');
// const Point = require('../route/pointModel');

// class PassPoint extends Sequelize.Model{}

// PassPoint.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     }
// },{
//     sequelize,
//     modelName: 'passPoint'
// });

// PassPoint.belongsTo(Pass);
// PassPoint.belongsTo(Point);

// // PassPoint.sync().catch(function(error){
// //     console.log('Pass points table not created', error);
// // })

// module.exports = PassPoint;
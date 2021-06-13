// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;

// const Pass = require('./passModel');
// const Trip = require('../journey/tripModel');

// class PassTrip extends Sequelize.Model{}

// PassTrip.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     }
// },{
//     sequelize,
//     modelName: 'passTrip'
// });

// PassTrip.belongsTo(Pass);
// PassTrip.belongsTo(Trip);

// // PassTrip.sync().catch(function(error){
// //     console.log('Pass trip table not created', error);
// // })

// module.exports = PassTrip;
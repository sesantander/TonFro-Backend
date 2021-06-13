// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;


// class Pass extends Sequelize.Model{}

// Pass.init({
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
//     price:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     trips:{
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     validity: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },
//     isActive: {
//         allowNull: false,
//         type: Sequelize.INTEGER
//     }
// },{
//     sequelize,
//     modelName: 'pass'
// });

// Pass.sync().catch(function(error){
//     console.log('Pass table not created', error);
// })

// module.exports = Pass;
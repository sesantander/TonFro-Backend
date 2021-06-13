// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const UserType = require('./userTypeModel');


// class User extends Sequelize.Model{}

// User.init({
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
//     email: {
//        type: Sequelize.STRING,
//     },
//     emailVerified:{
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false
//     },
//     mobile:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     gender: {
//         type: Sequelize.ENUM,
//         values: ['male','female'],
//     },
//     image: {
//         type: Sequelize.STRING,
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     deviceId:{
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     pushToken: {
//         type: Sequelize.STRING,
//     }
    
// },{
//     sequelize,
//     modelName: 'user',
//     createdAt: true
// });

// User.belongsTo(UserType);

// // User.sync().catch(function(error){
// //     console.log('User table not created', error);
// // })

// module.exports = User;
// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;

// const UserTypeEnum = {
//     admin: "admin",
//     user: "user",
//     driver: "driver"
// }

// class UserType extends Sequelize.Model{}

// UserType.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     name:{
//         type: Sequelize.ENUM,
//         values: [UserTypeEnum.admin, UserTypeEnum.user, UserTypeEnum.driver],
//         allowNull: false
//     },
//     accessLevel: {
//        type: Sequelize.STRING,
//        allowNull: false,
//        defaultValue: "1"
//     }
// },{
//     sequelize,
//     modelName: 'userType'
// });

// // UserType.sync().catch(function(error){
// //     console.log('UserType table not created');
// // })

// module.exports = UserType;
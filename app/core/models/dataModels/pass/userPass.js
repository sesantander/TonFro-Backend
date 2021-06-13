// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const OrderStatus = require('../../../constants').PaymentStatus;

// const Pass = require('./passModel');
// const User = require('../user/userModel');

// class UserPasses extends Sequelize.Model{}

// UserPasses.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     validUpto:{
//         type: Sequelize.DATEONLY,
//         allowNull: false
//     },
//     tripConsume:{
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     },
//     tripAllowed:{
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     },
//     orderStatus:{
//         type: Sequelize.ENUM,
//         defaultValue: OrderStatus.pending,
//         values: [OrderStatus.pending, OrderStatus.cancel, OrderStatus.failed, OrderStatus.completed, OrderStatus.refundInitiated, OrderStatus.refund]
//     },
//     price:{
//         type: Sequelize.FLOAT,
//         defaultValue: 0
//     },
//     orderId:{
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// },{
//     sequelize,
//     modelName: 'userPass',
//     timestamps:true
// });

// UserPasses.belongsTo(Pass);
// UserPasses.belongsTo(User);

// // PassPoint.sync().catch(function(error){
// //     console.log('Pass points table not created', error);
// // })

// module.exports = UserPasses;
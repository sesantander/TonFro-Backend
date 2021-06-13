// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const OrderStatus = require('../../../constants').PaymentStatus;


// const User = require('../user/userModel');

// class Payment extends Sequelize.Model{}

// Payment.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     orderId:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     price: {
//         type: Sequelize.FLOAT,
//         defaultValue: 0
//     },
//     orderStatus:{
//         type: Sequelize.ENUM,
//         defaultValue: OrderStatus.pending,
//         values:[OrderStatus.pending, OrderStatus.refund, OrderStatus.cancel, OrderStatus.completed, OrderStatus.failed, OrderStatus.refundInitiated]
//     },
//     paymentFor:{ //pass, seat
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// },{
//     sequelize,
//     modelName: 'payment',
//     timestamps: true
// });


// Payment.belongsTo(User);

// Payment.sync().catch(function(error){
//     console.log('payment table not created', error);
// })

// module.exports = PointImage;
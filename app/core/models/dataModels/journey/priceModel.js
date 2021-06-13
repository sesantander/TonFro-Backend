// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// // const Route = require('../route/routeModel');
// const Point = require('../route/pointModel');
// const Trip = require('./tripModel')

// class Price extends Sequelize.Model{}

// Price.init({
    
//     price:{
//         type: Sequelize.FLOAT,
//         allowNull: false,
//         defaultValue: 0.0
//     },
//     date: {
//         type: Sequelize.DATEONLY,
//         primaryKey:true,
//         defaultValue: new Date('01/01/1901')
//     },
//     tripId:{
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'trip',
//             key:'id'
//         }
//     },
//     fromId:{
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'point',
//             key:'id'
//         }
//     },
//     toId:{
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//         references:{
//             model: 'point',
//             key:'id'
//         }
//     }

// },{
//     sequelize,
//     modelName: 'price'
// });

// // Price.sync().catch(function(error){
// //     console.log('Price table not created',error);
// // })

// module.exports = Price;
// const Sequelize = require('sequelize');
// const sequelize = require('../../../db').sequelize;
// const Point = require('./pointModel');
// const Route = require('./routeModel');

// class RouteInfo extends Sequelize.Model{}

// RouteInfo.init({
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
// //    distanceFromPrev: {
// //        type: Sequelize.INTEGER,
// //        allowNull: false,
// //        defaultValue:0
// //    },
// //    timeFromPrev:{
// //         type: Sequelize.INTEGER,
// //         allowNull:false,
// //         defaultValue:0
// //    },
//    routeIndex: {
//        type:Sequelize.INTEGER,
//        allowNull: false
//    },
//    isActive:{
//        type: Sequelize.BOOLEAN,
//        allowNull: false,
//        defaultValue: true
//    }
// },{
//     sequelize,
//     modelName: 'routeInfo'
// });

// RouteInfo.belongsTo(Route);
// RouteInfo.belongsTo(Point);

// // RouteInfo.sync().catch(function(error){
// //     console.log('RouteInfo table not created');
// // })

// module.exports = RouteInfo;
const Sequelize = require('sequelize');
const sequelizeConfig = require('../../config').db.sequelize;

const connection = new Sequelize( sequelizeConfig.db, sequelizeConfig.username, sequelizeConfig.password, {
    host : sequelizeConfig.url,
    dialect: sequelizeConfig.dialect,
    protocol: sequelizeConfig.protocol,
    pool: {
        max:9,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    define:{
        freezeTableName: true,
        timestamps: false,
        paranoid: true
    }
});

module.exports = connection; 
const winston = require('winston');
require('winston-daily-rotate-file');
var Path = require('path');

    myFormat = () => {
        return new Date(Date.now()).toUTCString()
    }


class LoggerService {
    constructor(route) {
        this.log_data = null
        this.route = route
        var path = Path.dirname(require.main.filename);
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new (winston.transports.DailyRotateFile)({
                    filename:  `${path + '/logs/' + route}-%DATE%.log`,//`./logs/${new Date()}${route}.log`,
                    datePattern: 'YYYY MM DD HH mm',
                    zippedArchive:true,
                    frequency: '10m',
                    maxSize: '32m',
                    maxFiles: '14d'
                })
            ],
            format: winston.format.printf((info) => {
                let message = `${myFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${info.message} | `
                message = info.obj ? message + `data:${JSON.stringify(info.obj)} | ` : message
                message = this.log_data ? message + `log_data:${JSON.stringify(this.log_data)} | ` : message
                return message
                })
            });
        this.logger = logger
    }


    setLogData(log_data) {
        this.log_data = log_data
    }


    async info(message) {
        this.logger.log('info', message);
    }


    async info(message, obj) {
        this.logger.log('info', message, {
            obj
        })
    }


    async debug(message) {
        this.logger.log('debug', message);
    }


    async debug(message, obj) {
        this.logger.log('debug', message, {
            obj
        })
    }


    async error(message) {
        this.logger.log('error', message);
    }


    async error(message, obj) {
        this.logger.log('error', message, {
            obj
        })
    }
}

module.exports = new LoggerService('Tnf');

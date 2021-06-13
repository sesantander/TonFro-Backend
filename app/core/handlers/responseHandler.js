const {Logger} = require('../utility');

/**
 *@description Response Handler 
 */
exports.buildResponse = function (data) {
    const response =  {
        status: true,
        statusCode: data.statusCode || 200,
        statusMessage: data.statusMessage || 'success',
        data: data || {}
    };

    Logger.info('response data', response);    
    return response;
};
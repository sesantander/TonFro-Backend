const validation = require('express-validation');
const {Sequelize} = require('../db/models');
const {Logger} = require('../utility');
/**
 *@description Error Handler 
 */
exports.errorHandler = (err, req, res, next) => {

    console.log('errors', err);

    Logger.error('error in req', {
        url: req.url,
        body: req.body,
        header: req.header,
        params: req.params,
        error: err
    });

    if (err instanceof validation.ValidationError){        
        return res.status(err.status).json(err);
    }

    if (err instanceof Sequelize.ValidationError){

        const data = err.errors.map(errorItem =>{
            return errorItem.message;
        });

        return  res.status(err.status || 200).json({
        status: false,
        statusMessage: err.message,
        statusCode: err.statusCode || 200,
        response: {data: data}
    });
    }

    return  res.status(err.status || 200).json({
        status: false,
        statusMessage: err.message,
        statusCode: err.statusCode || 200,
        response: {}
    });
};


exports.validationErrors = (err) => {
    const errors = this.parseValidationErrors(err)
    const obj = {};
    obj["status"] = false;
    obj["statusMessage"] = 'Validation error';
    obj["statusCode"] = 201;
    obj["errors"] = errors || {};
    return obj;
}


/**
 *@description Unknown Route Handler 
 */
exports.unknownRouteHandler = (req, res) => {
    return res.status(400).json({
        status: false,
        statusMessage: '404 - Page Not found',
        statusCode: 404,
        response: {}
    });
};


/**
 *@description Modify the error format.
 */
exports.parseValidationErrors = function (errors) {
    let errorObject = {};

    Object.keys(errors).forEach(function (value) {
        errorObject[value] = errors[value].msg;
    });

    return errorObject;
};

const getErrors = (data) => {
    return this.validationErrors(data.mapped());
};


exports.validateSchema = function (schema, req, res, next){
    req.checkBody(schema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}
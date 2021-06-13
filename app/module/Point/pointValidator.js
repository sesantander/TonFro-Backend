const exceptionHandler = require('../../core/handlers').errorHandler;

const getErrors = (data) => {
    return exceptionHandler.validationErrors(data.mapped());
};

async function add(req, res, next){
    let bodySchema = {
        lat: {
            notEmpty: true,
            errorMessage: "invalid latitude"
        },
        long: {
            notEmpty: true,
            errorMessage: "inavlid longitude"
        },
        name:{
            notEmpty: true,
            errorMessage: "invalid point name"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

async function activate(req, res, next){
    let bodySchema = {
        pointId: {
            notEmpty: true,
            errorMessage: "invalid point"
        },
        isActive: {
            notEmpty: true,
            errorMessage: "activation missing"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

async function update(req, res, next){
    let bodySchema = {
        pointId: {
            notEmpty: true,
            errorMessage: "invalid point"
        },
        lat: {
            notEmpty: true,
            optional: true,
            errorMessage: "invalid latitude"
        },
        long:{
            notEmpty: true,
            optional: true,
            errorMessage: "invalid longitude"
        },
        name:{
            notEmpty: true,
            optional: true,
            errorMessage: "invalid name"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

async function getAll(req, res, next){
    return next();
}


module.exports = {
    add,
    activate,
    update,
    getAll
}

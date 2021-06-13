const exceptionHandler = require('../../core/handlers').errorHandler;

const getErrors = (data) => {
    return exceptionHandler.validationErrors(data.mapped());
};

async function add(req, res, next){
    let bodySchema = {
       
        name: {
            notEmpty: true,
            errorMessage: "invalid pass name"
        },
       
        trips:{
            notEmpty: true,
            errorMessage: "invalid trips count"
        },
        validity: {
            notEmpty: true,
            errorMessage: "invalid validity days"
        },
        isActive:{
            notEmpty: true,
            errorMessage: "invalid active status"
        },
        description: {
            notEmpty: true,
            errorMessage: "please add description about it"
        },
        
        isSuspended:{
            notEmpty: true,
            errorMessage: "pass susoend status required"
        },
        isDynamic:{
            notEmpty: true,
            errorMessage: "isDynamic pass param required"
        },
        isForAllPoint:{
            notEmpty: true,
            errorMessage: "is pass used for all points?"
        },
        isForAllTrip:{
            notEmpty: true,
            errorMessage: "is pass used for all Journeys?"
        },
        discPerRidePercentage:{
            notEmpty: true,
            errorMessage: "Add the discount per ride percentage"
        },
       
        additionalBenefit:{
            notEmpty: true,
            errorMessage: "the pass have an additional benefit?"
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
        
        name: {
            notEmpty: true,
            errorMessage: "invalid pass name",
            optional: true,
        },
       
        trips:{
            notEmpty: true,
            errorMessage: "invalid trips count",
            optional: true,
        },
        validity: {
            notEmpty: true,
            errorMessage: "invalid validity days",
            optional: true,
        },
        isActive:{
            notEmpty: true,
            errorMessage: "invalid active status",
            optional: true,
        },
        description: {
            notEmpty: true,
            errorMessage: "please add discription about it",
            optional: true,
        },
        
       
        isSuspended:{
            notEmpty: true,
            errorMessage: "pass susoend status required",
            optional: true,
        },
        isDynamic:{
            notEmpty: true,
            errorMessage: "isDynamic pass param required",
            optional: true,
        },
        isForAllPoint:{
            notEmpty: true,
            errorMessage: "is pass used for all points?",
            optional: true,
        },
        isForAllTrip:{
            notEmpty: true,
            errorMessage: "is pass used for all Journeys?",
            optional: true,
        },
        
        discPerRidePercentage:{
            notEmpty: true,
            errorMessage: "Add the discount per ride percentage",
            optional: true,
        },
        
        
        additionalBenefit:{
            notEmpty: true,
            errorMessage: "the pass have an additional benefit?"
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


async function buyPass(req, res, next){
    let bodySchema = {
        passId:{
            notEmpty: true,
            errorMessage: "invalid pass id"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}



module.exports = {
    add,   
    getAll,
    update,
    buyPass
}

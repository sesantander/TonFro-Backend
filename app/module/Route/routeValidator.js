const exceptionHandler = require('../../core/handlers').errorHandler;


function add(req, res, next) {
    
    let bodySchema = {
        name: {
            notEmpty: true,
            isString: true,
            errorMessage: "invalid route name"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "empty route id"
        },
        name: {
            notEmpty: true,
            errorMessage: "empty route name"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function getPoints(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "empty route id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function updatePoints(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "empty route id"
        },
        points: {
            notEmpty: true,
            errorMessage: "empty route points name"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function all(req, res, next) {
    next();
}

function filtered(req, res, next) {
    let bodySchema = {
        startingPointId:{
            notEmpty: true,
            errorMessage: "invalid starting point id"
        },
        endPointId:{
            notEmpty:true,
            errorMessage:"invalid end point id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function activate(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "invalid route id"
        },
        isActive:{
            notEmpty:true,
            errorMessage:"empty activation status"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function addPrice(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "invalid route id"
        },
        fromId:{
            notEmpty:true,
            errorMessage:"invalid from point"
        },
        toId:{
            notEmpty: true,
            errorMessage: "invalid to point"
        },
        price:{
            notEmpty: true,
            errorMessage: "not a valid price"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function allPrice(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty: true,
            errorMessage: "invalid route id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



module.exports = {
    add,
    update,
    all,
    filtered,
    activate,
    getPoints,
    updatePoints,
    addPrice,
    allPrice
}
const exceptionHandler = require('../../core/handlers').errorHandler;


function add(req, res, next) {
    
    let bodySchema = {
        routeId:{
            notEmpty:true,
            errorMessage:"routeId necessary"
        },
        name:{
            notEmpty:true,
            errorMessage:"name is required"
        },
        maxSeat:{
            notEmpty:true,
            errorMessage:"max seats required"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "empty trip id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function updateSeat(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "empty trip id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function getDetail(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "empty trip id"
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
            errorMessage: "starting point not added"
        },
        endPointId:{
            notEmpty: true,
            errorMessage: "end point not found"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function addPoints(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "starting point not added"
        },
        points:{
            notEmpty: true,
            errorMessage: "end point not found"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function addPrice(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "starting point not added"
        },
        prices:{
            notEmpty: true,
            errorMessage: "end point not found"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function getPrice(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "starting point not added"
        },
        sourcePointId:{
            notEmpty: true,
            errorMessage: "source point not found"
        },
        destinationPointId:{
            notEmpty: true,
            errorMessage: "destination point not found"
        },
        date:{
            notEmpty: true,
            errorMessage: "date not found"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


module.exports = {
    add,
    update,
    updateSeat,
    getDetail,
    filtered,
    all,
    addPoints,
    addPrice,
    getPrice
}
const exceptionHandler = require('../../core/handlers').errorHandler;


function createOrder(req, res, next) {
    
    let bodySchema = {
        seatCount: {
            notEmpty: true,
            errorMessage: "seat count must not be empty"
        },
        tripId: {
            notEmpty: true,
            errorMessage: "invalid TripId"
        },
        travelDate:{
            notEmpty: true,
            errorMessage: "Invalid travel date"
        },
        from:{
            notEmpty:true,
            errorMessage: "starting point not defined"
        },
        to:{
            notEmpty:true,
            errorMessage: "end point not defined"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function createOrderFromPass(req, res, next) {
    
    let bodySchema = {
        seatCount: {
            notEmpty: true,
            errorMessage: "seat count must not be empty"
        },
        tripId: {
            notEmpty: true,
            errorMessage: "invalid TripId"
        },
        travelDate:{
            notEmpty: true,
            errorMessage: "Invalid travel date"
        },
        from:{
            notEmpty:true,
            errorMessage: "starting point not defined"
        },
        to:{
            notEmpty:true,
            errorMessage: "end point not defined"
        },
        passId:{
            notEmpty:true,
            errorMessage: "invalid pass"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        seatCount: {
            notEmpty: true,
            errorMessage: "seat count must not be empty"
        },
        from: {
            notEmpty: true,
            errorMessage: "invalid source point"
        },
        to:{
            notEmpty: true,
            errorMessage: "Invalid destination point"
        },
        price:{
            notEmpty: true,
            errorMessage: "Invalid price"
        },
        bookingId:{
            notEmpty: true,
            errorMessage: "Invalid booking"
        },
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function history(req, res, next) {
    
    next();

//     let bodySchema = {
//         userId: {
//             notEmpty: true,
//             errorMessage: "user id not avialable"
//         }
//     };

//    exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function status(req, res, next) {
    
    
    let bodySchema = {
        orderId: {
            notEmpty: true,
            errorMessage: "order id invalid"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function generateInvoice(req, res, next) {
    
    let bodySchema = {
        bookingId: {
            notEmpty: true,
            errorMessage: "booking id invalid"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function cancel(req, res, next) {
    
    
    let bodySchema = {
        bookingId: {
            notEmpty: true,
            errorMessage: "booking id invalid"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


module.exports = {
    createOrder,
    history,
    update,
    status,
    cancel,
    createOrderFromPass,
    generateInvoice
}
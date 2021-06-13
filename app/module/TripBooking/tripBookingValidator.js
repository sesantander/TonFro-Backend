const exceptionHandler = require('../../core/handlers').errorHandler;


function add(req, res, next) {
    
    let bodySchema = {
        tripId: {
            notEmpty: true,
            errorMessage: "invalid trip"
        },
        date: {
            notEmpty: true,
            optional: true,
            errorMessage: "invalid date"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        isActive:{
            notEmpty: true,
            errorMessage: "invalid activation status",
            optional: true
        },
        date:{
            notEmpty: true,
            errorMessage: "invalid date",
            optional: true
        },
        maxSeat:{
            notEmpty: true,
            errorMessage: "invalid activation status",
            optional: true
        },
        bookingId:{
            notEmpty: true,
            errorMessage: "invalid driver id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function all(req, res, next) {
    next();
}


function activate(req, res, next) {
    
    let bodySchema = {
        bookingId:{
            notEmpty: true,
            errorMessage: "invalid driver id"
        },
        isActive:{
            notEmpty:true,
            errorMessage:"empty activation status"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function getAllJourneyBooking(req, res, next) {
    
    let bodySchema = {
        date:{
            notEmpty: true,
            errorMessage: "invalid date"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function dailyTotalBooking(req, res, next) {
    
    let bodySchema = {
        date:{
            notEmpty: true,
            errorMessage: "invalid date"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function availability(req, res, next) {
    
    let bodySchema = {
        seatCount: {
            notEmpty: true,
            errorMessage: "seat count invalid"
        },
        date:{
            notEmpty: true,
            errorMessage: "invalid date"
        },
        tripId:{
            notEmpty: true,
            errorMessage: "invalid trip id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function checkPrice(req, res, next) {
    
    let bodySchema = {
        
        date:{
            notEmpty: true,
            errorMessage: "invalid date"
        },
        tripId:{
            notEmpty: true,
            errorMessage: "invalid trip id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function totalBooking(req, res, next) {
    
    let bodySchema = {
        fromDate: {
            notEmpty: true,
            errorMessage: "invalid start date"
        },
        toDate:{
            notEmpty: true,
            errorMessage: "invalid end date"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function monthlyBooking(req, res, next) {
    
    next();
//     let bodySchema = {
//         fromDate: {
//             notEmpty: true,
//             errorMessage: "invalid start date"
//         },
//         toDate:{
//             notEmpty: true,
//             errorMessage: "invalid end date"
//         }
//     };

//    exceptionHandler.validateSchema(bodySchema, req, res, next);
}


module.exports = {
    add,
    update,
    all,
    activate,
    getAllJourneyBooking, 
    dailyTotalBooking,
    availability,
    dailyTotalBooking,
    totalBooking,
    checkPrice,
    monthlyBooking
}
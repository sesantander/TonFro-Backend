const exceptionHandler = require('../../core/handlers').errorHandler;


function add(req, res, next) {
    
    let bodySchema = {
        name: {
            notEmpty: true,
            isString: true,
            errorMessage: "invalid name"
        },
        password: {
            notEmpty: true,
            errorMessage: "invalid password"
        },
        mobile: {
            notEmpty: true,
            errorMessage: "invalid mobile number"
        },
        gender:{
            notEmpty: true,
            errorMessage: "invalid gender"
        },
        userType:{
            notEmpty: true,
            errorMessage: "invalid user type"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        idProofName:{
            notEmpty: true,
            errorMessage: "invalid id proof name",
            optional: true
        },
        idProofNumber: {
            notEmpty: true,
            errorMessage: "invalid id proof number",
            optional: true
        },
        idProofVerified: {
            notEmpty: true,
            errorMessage: "invalid id proof verification status",
            optional: true
        },
        addProofName:{
            notEmpty: true,
            errorMessage: "invalid address proof name",
            optional: true
        },
        addProofNumber: {
            notEmpty: true,
            errorMessage: "invalid address proof number",
            optional: true
        },
        addProofVerified: {
            notEmpty: true,
            errorMessage: "invalid address proof verification status",
            optional: true
        },
        isActive:{
            notEmpty: true,
            errorMessage: "invalid activation status",
            optional: true
        },
        driverId:{
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
        driverId:{
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


function assignedVehicle(req, res, next) {
    
    let bodySchema = {
        driverId:{
            notEmpty: true,
            errorMessage: "invalid driver id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function tripBookingData(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "invalid journey id"
        },
        travelDate:{
            notEmpty: true,
            errorMessage:"invalid travel date"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function updateBookingData(req, res, next) {
    
    let bodySchema = {
        tripId:{
            notEmpty: true,
            errorMessage: "invalid journey id"
        },
        travelDate:{
            notEmpty: true,
            errorMessage:"invalid travel date"
        },
        bookingId: {
            notEmpty:true,
            errorMessage: "invalid booking"
        },
        status: {
            notEmpty: true,
            errorMessage:"invalid status request"
        },
        userId: {
            notEmpty:true,
            errorMessage:"invalid userId"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


module.exports = {
    add,
    update,
    all,
    activate,
    assignedVehicle,
    tripBookingData,
    updateBookingData
}
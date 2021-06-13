const exceptionHandler = require('../../core/handlers').errorHandler;


function add(req, res, next) {
    
    let bodySchema = {
        vehicleNumber: {
            notEmpty: true,
            isString: true,
            errorMessage: "invalid vehicle number"
        },
        maxSeat: {
            notEmpty: true,
            errorMessage: "invalid seat"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function update(req, res, next) {
    
    let bodySchema = {
        vehicleNumber: {
            notEmpty: true,
            isString: true,
            optional: true,
            errorMessage: "invalid vehicle number"
        },
        maxSeat: {
            notEmpty: true,
            optional: true,
            errorMessage: "invalid seat"
        },
        vehicleId:{
            notEmpty: true,
            errorMessage: "invalid vehicle id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function updateDriver(req, res, next) {
    
    let bodySchema = {
        vehicleId:{
            notEmpty: true,
            errorMessage: "invalid vehicle id"
        },
        driverId:{
            notEmpty:true,
            errorMessage:"empty driver id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function activate(req, res, next) {
    
    let bodySchema = {
        vehicleId:{
            notEmpty: true,
            errorMessage: "invalid vehicle id"
        },
        isActive:{
            notEmpty:true,
            errorMessage:"empty activation status"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}

function driverAssigned(req, res, next) {
    
    let bodySchema = {
        vehicleId:{
            notEmpty: true,
            errorMessage: "invalid vehicle id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}


function addImei(req, res, next) {
    
    let bodySchema = [{
        imei:{
            notEmpty: true,
            errorMessage: "invalid imei"
        }
    }];

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function imeiUpdate(req, res, next) {
    
    let bodySchema = {
        imei:{
            notEmpty: true,
            errorMessage: "invalid imei"
        },
        isActive:{
            notEmpty: true,
            optional: true,
            errorMessage: "invalid isactive"
        }
        //,
        //vehicleId: {
        //    notEmpty: true,
        //    optional: true,
        //    errorMessage: "invalid vehicle Id"
        //}
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



function assignedVehicle(req, res, next) {
    
    let bodySchema = {
        imei:{
            notEmpty: true,
            errorMessage: "invalid imei"
        },
        vehicleId:{
            notEmpty: true,
            errorMessage: "invalid vehicle id"
        }
    };

   exceptionHandler.validateSchema(bodySchema, req, res, next);
}



module.exports = {
    add,
    update,
    updateDriver,
    activate,
    driverAssigned,
    addImei,
    imeiUpdate,
    assignedVehicle,
}
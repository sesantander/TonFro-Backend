const handlers = require('../../core/handlers');
const Exception = require('../../core/exceptions');
// const Vehicle = require('../../core/models/dataModels/user/vehicleModel');
// const Imei = require('../../core/models/dataModels/user/vehicleImeiModel');
// const Driver = require('../../core/models/dataModels/user/driverModel');
const {Driver, VehicleImei, Vehicle, User, Booking, Sequelize} = require('../../core/db/models');
const formidable = require('formidable');
const {RideStatus} = require('../../core/constants');

// const User  = require('../../core/models/dataModels/user/userModel');
const File = require('fs');
var Path = require('path');
var mv = require('mv');
var {removeIfExist, moveFile} = require('../../core/utility');
async function add(req,res,next){

    try{
        
        const vehicle = await Vehicle.create(req.body);

       return res.send(handlers.responseHandler.buildResponse(vehicle));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function update(req,res,next){

    try{
        console.log('xxxxxxxxxxxxxxxxxxxxxx',req.body)
        var vehicle = await Vehicle.findOne({where: {id: req.body.vehicleId}});

        if (!vehicle) return next(Exception.Route.VEHICLE_NOT_FOUND);

        if (req.body.serviceType){
            req.body.service_type = req.body.serviceType
        }
        
        var vehicleData = await vehicle.update(req.body);

        if(req.body.driverId){
            var vehicleId = vehicle.id;
            var driverId = vehicle.driverId;
            
             Booking.update({
                driverId: driverId
            },
            {
                where: Sequelize.and(
                    { vehicleId: vehicleId},
                Sequelize.or(
                    {rideStatus: RideStatus.pending},
                    {rideStatus: RideStatus.notBooked}
                )
                )
            });
        }

       return res.send(handlers.responseHandler.buildResponse({"msg":"updated successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function updateDriver(req,res,next){

    try{
        
        var vehicle = await Vehicle.findOne({where: {id: req.body.vehicleId}});

        if (!vehicle) return next(Exception.Route.VEHICLE_NOT_FOUND);

        var driver = await Driver.findOne({where: {id: req.body.driverId}});

        if (!driver) return next(Exception.Route.DRIVER_NOT_FOUND);

        var vehicleData = await vehicle.update({
            driverId: driver.id
        });
            
        Booking.update({
                driverId: driver.id
            },
        {
            where: Sequelize.and(
                { vehicleId: vehicle.id},
            Sequelize.or(
                {rideStatus: RideStatus.pending},
                {rideStatus: RideStatus.notBooked}
            )
            )
        });

        return res.send(handlers.responseHandler.buildResponse({"msg":"update successfully"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }   
}


async function activate(req,res,next){

    try{
        
        
        var vehicle = await Vehicle.findOne({where: {id: req.body.vehicleId}});

        if (!vehicle) return next(Exception.Route.VEHICLE_NOT_FOUND);

        var vehicleData = await vehicle.update({
            isActive: req.body.isActive
        });

        return res.send(handlers.responseHandler.buildResponse({isActive: req.body.isActive}));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function all(req,res,next){

    try{    
        
        var vehicleData = await Vehicle.findAll(
            {
                include:[{model: Driver, as: 'driver', paranoid: false, required: false, 
                include:[{model: User, as: 'user', paranoid: false, required: false, attributes:{exclude:['pushToken', 'userTypeId', 'password','emailVerified']}
            }]
            }],
            order:[['updatedAt','desc']]
            }
        );

        return res.send(handlers.responseHandler.buildResponse(vehicleData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function getVehicle(req,res,next){

    try{
        
        var vehicleData = await Vehicle.findOne({where:{id: req.params.id},
            include:[{model: Driver, as: 'driver', paranoid: false, required: false, 
            include:[{model: User, as: 'user', paranoid: false, required: false,  attributes:{exclude:['pushToken', 'userTypeId', 'password','emailVerified']}
        }]
        }]
        });

        return res.send(handlers.responseHandler.buildResponse(vehicleData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function driverAssigned(req,res,next){
    try{
        
        var driverData = await Vehicle.findAll({where:{id: req.body.vehicleId},
            include:[{model: Driver, as: 'driver', paranoid: false, required: false, 
            include:[{model: User, as: 'user', paranoid: false, required: false,  attributes:{exclude:['pushToken', 'userTypeId', 'password','emailVerified']}
        }]
        }]
        });

        return res.send(handlers.responseHandler.buildResponse(driverData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function image(req, res, next){
    
    try{
        
          let form = new formidable.IncomingForm();
            
        let parsedFields = await new Promise(async function(resolve, reject) {
            form.parse(req, async function(err, fields, fileName){
                //console.log(fields)
               //
               console.log("ENTROROOO")
                if (fields.vehicleId){
                    var vehicle = await Vehicle.findOne({where: {id:fields.vehicleId}}) ;

                    if (!vehicle) return next(Exception.Route.VEHICLE_NOT_FOUND);
                }else{
                    return next(Exception.Route.VEHICLE_NOT_FOUND);
                }
                console.log('xxdd',vehicle.image)
                if (fileName.image){

                    const url = await moveFile(fileName.image, 'vehicle/');
                        removeIfExist(vehicle.image);
                        fields.image = url;
                }
                        return resolve(fields)
            });
        });
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        const model = {
            image: parsedFields.image
        }
        console.log("senas",model.image)
        const data = await Vehicle.update(model, {
            where:{
                id : parsedFields.vehicleId
            }
        });
        
        return res.send(handlers.responseHandler.buildResponse({"msg": "vehicle image updated successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function addImei(req,res,next){
    try{
        const IMEIBody={
               
            imei: req.body.imei,
            isActive: req.body.isActive,
            vehicleId: req.body.vehicleId,
            
        }
        var im=req.body.imei;
       var vehicleimei;
        if  (im.length>=10 && im.length<=20){ 
                
             vehicleimei = await VehicleImei.create(IMEIBody);
            
        }else{

            return next({
                statusCode: 410,
                message: "Invalid length"
            });

        }
    
    
            return res.send(handlers.responseHandler.buildResponse(vehicleimei));
    
       
    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function imeiUpdate(req,res,next){
    try{

      
       var im=req.body.imei;
       var imeiData;
        if  (im.length>=10 && im.length<=20){ 
                imeiData = await VehicleImei.update(
                {imei: im}, 
                { where:{id: req.body.userId}
            });
            
        }else{

            return next({
                statusCode: 410,
                message: "Invalid length"
            });

        }

       
        return res.send(handlers.responseHandler.buildResponse(imeiData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function allImei(req,res,next){
    try{
        
        var imeiData = await VehicleImei.findAll({
            include:[
               
                { model: Vehicle, as: "vehicle", required: false, attributes:['vehicleNumber'] }
               
            ]
         });


        return res.send(handlers.responseHandler.buildResponse(imeiData));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function assignedVehicle(req,res,next){
    try{
        
        const data = await VehicleImei.update({vehicleId: req.body.vehicleId}, {where: {
            imei: req.body.imei
        }});

        return res.send(handlers.responseHandler.buildResponse({"msg":"imei assigned to vehicle"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function imeiForVehicle(req,res,next){
    try{
        
        var data = await VehicleImei.findAll({where:{
            vehicleId: req.params.id
        }});

        return res.send(handlers.responseHandler.buildResponse(data));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

module.exports = {
    add,
    activate,
    update,
    updateDriver,
    all,
    driverAssigned,
    getVehicle,
    image,
    addImei,
    imeiUpdate,
    allImei,
    assignedVehicle,
    imeiForVehicle
} 


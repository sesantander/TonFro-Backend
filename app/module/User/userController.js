const UserDAL = require('../../core/models/dataAccessLayer/userDAL');
const userHelper = require('./userHelper');
const logger = require('../../core/loggers/morgan');
const handlers = require('../../core/handlers');
const Exception = require('../../core/exceptions');
const services = require('../../services');

const {BookingStatus} = require('../../core/constants');
const {Vehicle, Trip, Rating, Feedback, PreferredLocation,
     Notification, Suggestion, User, Booking, UserType,
      AdminNotification, Session, Sequelize} = require('../../core/db/models');
const formidable = require('formidable');
const validator = require('validator');

const File = require('fs');
var Path = require('path');
var mv = require('mv');
var {removeEmpty, moveFile, removeIfExist} = require('../../core/utility');
const {UserTypeENUM} = require('../../core/constants');
const notificationService = require('../../services').googleService;
const passport = require('passport');

async function signup(req,res,next){

    try{
        const findParam = {mobile: req.body.mobile};
        const user = await UserDAL.getUser(findParam);

        if (user) return next(Exception.User.USER_ALREADY_EXISTS);
        

    let userType = await UserType.findOne({where:{name: req.body.userType}});

    if(!userType) return next(Exception.User.INVALID_USER_TYPE);

        req.body.userType = userType.id;

        //need to uncomment
        //const result =  await services.googleService.verify(req.body.token);
        
        //if (result.phone_number !== req.body.mobile) return next(Exception.User.INVALID_FIREBASE_TOKEN_ERROR);

        const userModel = await userHelper.getUser(req.body);

        userModel.mobileVerified = true;

        console.log(userModel);

       const _ = await UserDAL.signup(userModel);
       
       //get model 

        const savedUser = await UserDAL.getUser({mobile: req.body.mobile});

       const userData  = await userHelper.getSignInObject(savedUser);

       //add login data
       const session = await Session.create({
           userId: savedUser.id,
           name: savedUser.name
       });

       return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function fbSignup(req,res,next){

    try{

        console.log(req);

        if (req.user.email == undefined && req.user.mobile == undefined){
            return next(Exception.User.INVALID_FB_TOKEN_ERROR);
        }

        var findParam = {
            mobile: req.body.mobile ? req.body.mobile : req.user.mobile,
            email: req.user.email ? req.user.email : req.body.email
        };


        const user = await UserDAL.getUser(removeEmpty(findParam));

        if (user) return next(Exception.User.USER_ALREADY_EXISTS);
        
        req.body.email = req.body.email ? req.body.email : req.user.email;

        req.body.mobile = req.body.mobile ? req.body.mobile : req.user.mobile;

        let userType = await UserType.findOne({where:{name: req.body.userType}});

        if(!userType) return next(Exception.User.INVALID_USER_TYPE);

        req.body.userType = userType.id;
        req.body.mobileVerified = req.user.mobile ? true : false
        req.body.emailVerified = req.user.email ? true : false 

        //need to uncomment
        
        const userModel = await userHelper.getUser(req.body);

        console.log(userModel);

       const _ = await UserDAL.signup(userModel);
       
       //get model 
         
        const savedUser = await UserDAL.getUser({mobile: req.body.mobile});

       const userData  = await userHelper.getSignInObject(savedUser);

       //add login data
       const session = await Session.create({
           userId: savedUser.id,
           name: savedUser.name
       });

       return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function googleSignup(req,res,next){

    try{
        
        //need to uncomment
        const result =  await services.googleSignIn.verify(req.body.token);

        //if (result.payload.email !== req.body.email) return next(Exception.User.INVALID_GOOGLE_TOKEN_ERROR);

        req.body.email = result.payload.email;
        req.body.emailVerified = result.payload.email_verified;

        const findParam = {mobile: req.body.email};
        const user = await UserDAL.getUser(findParam);

        if (user) return next(Exception.User.USER_ALREADY_EXISTS);
        

    let userType = await UserType.findOne({where:{name: req.body.userType}});

    if(!userType) return next(Exception.User.INVALID_USER_TYPE);

        req.body.userType = userType.id;

        const userModel = await userHelper.getUser(req.body);

        console.log(userModel);

       const _ = await UserDAL.signup(userModel);
       
       //get model
         
        const savedUser = await UserDAL.getUser({mobile: req.body.mobile});

       const userData  = await userHelper.getSignInObject(savedUser);

       //add login data
       const session = await Session.create({
           userId: savedUser.id,
           name: savedUser.name
       });

       return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function addConsumer(req,res,next){

    try{
        const findParam = {mobile: req.body.mobile};
        const user = await UserDAL.getUser(findParam);

        if (user) return next(Exception.User.USER_ALREADY_EXISTS);
        
        let userType = await UserType.findOne({where:{name: req.body.userType}});

        if(!userType) return next(Exception.User.INVALID_USER_TYPE);

        req.body.userType = userType.id;

        //need to uncomment
        // const result =  await services.googleService.verify(req.body.token);
        
        // if (result.phone_number !== req.body.mobile) return next(Exception.User.INVALID_FIREBASE_TOKEN_ERROR);

        const userModel = await userHelper.getUser(req.body);

        console.log(userModel);

       const _ = await UserDAL.signup(userModel);
       
       //get model 
         
        const savedUser = await UserDAL.getUser({mobile: req.body.mobile});

    //    const userData  = await userHelper.getSignInObject(savedUser);

       return res.send(handlers.responseHandler.buildResponse({userId: savedUser.id}));

    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function login(req,res,next){

    try{

        var findParam;
        if (validator.isEmail(req.body.mobile)){
            findParam = {email: req.body.mobile}
        }else{
            findParam = {mobile: req.body.mobile} 
        }
        const user = await UserDAL.getUser(findParam);

        if (!user) return next(Exception.User.USER_NOT_FOUND);

        const isValid = await userHelper.isValidPassword(req.body.password, user);

        if (!isValid) return next(Exception.User.INVALID_PASSWORD);

        var userData  = await userHelper.getSignInObject(user);
        
        if (req.headers['user-type'] == UserTypeENUM.admin){

            const userType = await UserType.findOne({where:
                {id: user.userTypeId},
                attributes:['name']
            });
            
            if (!userType || userType.name != UserTypeENUM.admin) return next(Exception.User.INVALID_USER_TYPE);
        }

         //add login data
         const session = await Session.create({
                userId: user.id,
                name: user.name
            });
           
            console.log("xd",userData)

        return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }   
}



async function otpLogin(req,res,next){

    try{
        
        //need to uncomment
        const result =  await services.googleService.verify(req.body.token);
        
        if (result.phone_number !== req.body.mobile) return next(Exception.User.INVALID_FIREBASE_TOKEN_ERROR);

        const userModel = await User.findOne({where:{mobile: req.body.mobile}});

        if(!userModel) return next(Exception.User.USER_NOT_FOUND);
        
        const userData  = await userHelper.getSignInObject(userModel);

        //add login data
        const session = await Session.create({
               userId: userModel.id,
               name: userModel.name
           });
    

       return res.send(handlers.responseHandler.buildResponse(userData));


    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function fbLogin(req,res,next){

    try{
        // const findParam = {mobile: req.body.mobile};
        // const user = await UserDAL.getUser(findParam);

        const param = {
            mobile: req.user.mobile,
            email: req.user.email
        };

        const user = await User.findOne({where: removeEmpty(param)});

        if (!user) return next(Exception.User.USER_NOT_FOUND);

        // const isValid = await userHelper.isValidPassword(req.body.password, user);

        // if (!isValid) return next(Exception.User.INVALID_PASSWORD);

        const userData  = await userHelper.getSignInObject(user);


                //add login data
                const session = await Session.create({
                    userId: user.id,
                    name: user.name
                });
         
     

        return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }   
}


async function googleLogin(req,res,next){

    try{
        // const findParam = {mobile: req.body.mobile};
        // const user = await UserDAL.getUser(findParam);

        const result =  await services.googleSignIn.verify(req.body.googleToken);

        if (!result) return next(Exception.User.INVALID_GOOGLE_TOKEN_ERROR);

        const user = await User.findOne({where:{
            email: result.payload.email
        }});

        if (!user) return next(Exception.User.USER_NOT_FOUND);

        const userData  = await userHelper.getSignInObject(user);


                //add login data
                const session = await Session.create({
                    userId: user.id,
                    name: user.name
                });
         
        return res.send(handlers.responseHandler.buildResponse(userData));

    }catch (e){
        console.log('error',e);
        next(e)
    }   
}


async function resetPassword(req,res,next){

    try{
        const findParam = {mobile: req.body.mobile};
        const user = await UserDAL.getUser(findParam);

        if (!user) return next(Exception.User.USER_NOT_FOUND);
        
        const result =  await services.googleService.verify(req.body.token);
        // const result =  await services.googleService.verify(req.body.mobile);
        
        if (result.phone_number !== req.body.mobile) return next(Exception.INVALID_FIREBASE_TOKEN_ERROR);

        const password = await userHelper.getHash(req.body.newPassword);
        console.log("reset password", password, user);

        
        const _ = await UserDAL.updatePassword(user, password);

        
        return res.send(handlers.responseHandler.buildResponse({"msg":"passwordUpdated"}));

    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function logout(req,res,next){
    
    try{

        const data  = await Session.destroy({where: {userId: req.decode.id}});

        return res.send(handlers.responseHandler.buildResponse({"msg":"Logout Successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function bookingHistory(req, res, next){
    
    try{
        let id = req.decode.id;
        let bookings = await Booking.findAll({where:{userId: id}});
        console.log('bookings', bookings);
        return res.send(handlers.responseHandler.buildResponse(bookings));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function addToken(req, res, next){
    
    try{
        let id = req.decode.id;
        var user = await User.findAll({where:{id: id}});

        if (!user) return next(Exception.User.USER_NOT_FOUND);

         user = await user.update({
            pushToken: req.body.pushToken
        });

        return res.send(handlers.responseHandler.buildResponse({"msg":"token update successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function profileGet(req, res, next){
    
    try{
        let id = req.decode.id;
        let user = await User.findOne({where:{id: id}});

        if (!user) return next(Exception.User.USER_NOT_FOUND);
        const userData  = await userHelper.getSignInObject(user);
        return res.send(handlers.responseHandler.buildResponse(userData.user));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function profileUpdate(req, res, next){
    
    try{
        let id = req.decode.id;
        let user = await User.findOne({where:{id: id}});
        // let oldImagePath = user.image;
        
        if (!user) return next(Exception.User.USER_NOT_FOUND);
        var model = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            emailVerified: req.body.emailVerified,
            pushToken: req.body.pushToken
        }

        model = removeEmpty(model);

        let userData =await User.update(model, {where:{
            id: id
        }});

        return res.send(handlers.responseHandler.buildResponse({"msg": "profile updated successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function adminProfileUpdate(req, res, next){
    
    try{
        let id = req.body.userId;
        let user = await User.findOne({where:{id: id}});
        // let oldImagePath = user.image;
        
        if (!user) return next(Exception.User.USER_NOT_FOUND);
        var model = {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            emailVerified: req.body.emailVerified
        }

        model = removeEmpty(model);
        // let form = new formidable.IncomingForm();

        // let parsedFields = await new Promise(function(resolve, reject) {
        //     form.parse(req, function(err, fields, fileName){
        //         if (!fileName.image){
        //             return resolve(fields)
        //         }
        //         var oldPath = fileName.image.path;
        //         let path = Path.dirname(require.main.filename);
        //         console.log(oldImagePath);
                
        //         var relativePath = '/app/images/profile/' + Date.now() + Path.extname(fileName.image.name);
        //         var newPath = path + relativePath;
                
        //         mv(oldPath, newPath, function(err){

        //             if (err){
        //                 return reject("file invalid")
        //             }else{
        //                 if (File.existsSync(path + user.image)){
        //                     File.unlinkSync(path + user.image);                    
        //                 }
        //                 fields.image = relativePath;
        //                 return resolve(fields)
        //             }
        //         });
        //     });
        // });

        // console.log(parsedFields);

        let userData =await User.update(model, {where:{
            id: id
        }});

        return res.send(handlers.responseHandler.buildResponse({"msg": "profile updated successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}




async function updateProfileImage(req, res, next){
    
    try{

        const user = await User.findOne({where: {id: req.decode.id}});

        if (!user) return next(Exception.User.USER_NOT_FOUND);

          let form = new formidable.IncomingForm();

        let parsedFields = await new Promise(async function(resolve, reject) {
            form.parse(req, async function(err, fields, fileName){
                if (!fileName.image){
                    return resolve(fields)
                }

                //add proof image 
                if (fileName.image){

                    const url = await moveFile(fileName.image, 'profile/');
                    removeIfExist(user.image);
                    fields.image = url;
                }
                        return resolve(fields)
            })
        });

        const model = {
            image: parsedFields.image
        }
        
        const data = await user.update(model);

        return res.send(handlers.responseHandler.buildResponse({"msg": "profile image updated successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}




async function adminUpdateProfileImage(req, res, next){
    
    try{

          let form = new formidable.IncomingForm();

        let parsedFields = await new Promise(async function(resolve, reject) {
            form.parse(req, async function(err, fields, fileName){

                if (!fields.userId) return next(Exception.User.USER_NOT_FOUND);
                const user = await User.findOne({where: {id: fields.userId}});

        if (!user) return next(Exception.User.USER_NOT_FOUND);


                if (!fileName.image){
                    return resolve(fields)
                }

                //add proof image 
                if (fileName.image){

                    const url = await moveFile(fileName.image, 'profile/');
                    removeIfExist(user.image);
                    fields.image = url;
                }
                        return resolve(fields)
            })
        });

        const model = {
            image: parsedFields.image
        }
        
        const data = await User.update(model, {where:{
            id: parsedFields.userId
        }});

        return res.send(handlers.responseHandler.buildResponse({"msg": "profile image updated successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function downloadImage(req, res, next){
    
    try{
        
        let path = Path.dirname(require.main.filename);
        let image = path + "/app/images/" + req.body.imageUrl;

        console.log('old path',image);

        if (File.existsSync(image)){
            res.download(image);
        }else{
            return res.send(Exception.User.USER_NOT_FOUND);
        }

    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function getImage(req, res, next){
    
    try{

        console.log('get data');
        let path = Path.dirname(require.main.filename);
        let image = path + req.params[0];

        console.log(image);

        if (File.existsSync(image)){
            // res.download(image);
            res.sendFile(image);
        }else{
            return res.send(Exception.User.USER_NOT_FOUND);
        }
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function addSuggestion(req, res, next){
    
    try{

        var suggestions = req.body;
        let userId = req.decode.id; 

        let objs = suggestions.map(suggestion =>{
            let sug = {
                shift: suggestion.shift,
                time: suggestion.time,
                point: suggestion.point,
                userId: userId
            };
            return sug;
        });

        let suggestionData = await Suggestion.bulkCreate(objs);

        return res.send(handlers.responseHandler.buildResponse({"msg":"suggestion saved successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function getSuggestion(req, res, next){
    
    try{

        let suggestionData = await Suggestion.findAll({
            include:[{model: User, as: 'user', attributes:['name']}]
        });

        return res.send(handlers.responseHandler.buildResponse(suggestionData));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function notification(req, res, next){
    
    try{
        let notification = await Notification.findAll({where:{
            userId: req.decode.id
        },
        order:[['createdAt','desc']]
    });

        return res.send(handlers.responseHandler.buildResponse(notification));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function getAllNotification(req, res, next){
    
    try{
        let notification = await AdminNotification.findAll(
            {
                limit: req.body.limit,
                offset: req.body.offset,
                order:[['updatedAt','desc']]
                }
            );

        return res.send(handlers.responseHandler.buildResponse(notification));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function sendNotification(req, res, next){
    
    try{

        console.log('notification token', req.body.userIds);
        
        const ids = req.body.userIds;

        var tokens;
        if (!ids || ids.length == 0){
            
            tokens = await User.findAll({
                attributes: ['pushToken', 'id'],
                raw: true
        });

        }else{
            tokens = await  User.findAll({where:{
                id: ids
            },
            attributes: ['pushToken','id'],
            raw: true
        });
        }

        const userNotification = tokens.map(data => {
            return {
                date: new Date(),
                payload:req.body.message,
                userId: data.id
            }
        });

        await Notification.bulkCreate(userNotification);

        tokens = tokens.map(data => data.pushToken).filter(x => x);


        console.log('notification token', tokens);

        if (tokens.length  == 0) return res.send(handlers.responseHandler.buildResponse({"msg":"no user found"}));

        const data = await notificationService.sendToAll(req.body.message, tokens);

        return res.send(handlers.responseHandler.buildResponse(data));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function addPreferredLocation(req, res, next){
    
    try{
        var location = req.body;
        let userId = req.decode.id; 

        let objs = location.map(loc =>{
            let locat = {
                name : loc.name,
                location: loc.location,
                userId: userId
            };
            return locat;
        });

        let locationData = await PreferredLocation.bulkCreate(objs);

        if (!locationData) return send(Exception.User.INVALID_LOCATION);

        return res.send(handlers.responseHandler.buildResponse({"msg":"location saved successfully"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function getPreferredLocation(req, res, next){
    
    try{

        const location = await PreferredLocation.findAll({where:{
            userId: req.decode.id
        }});

        return res.send(handlers.responseHandler.buildResponse(location));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function all(req, res, next){
    
    try{

        // const typeId = await UserType.findOne({where: {name: UserTypeENUM.user}});

        const userData = await User.findAll(
            {
                include: {model: UserType, as: 'userType', paranoid: false, required: false, attributes:['name']},
                order:[['updatedAt','desc']]
            }
        );

        return res.send(handlers.responseHandler.buildResponse(userData));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}

async function filtered(req, res, next){
    
    try{

        // const typeId = await UserType.findOne({where: {name: UserTypeENUM.user}});

        const userFiter = {
            name: req.body.name ? req.body.name : "",
            mobile: req.body.mobile ? req.body.mobile : "",
            email: req.body.email ? req.body.email : "",
            // userTypeId: typeId.id
        }

        const userData = await User.findAll({where:
            Sequelize.and({
            name : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + userFiter.name + '%'),
            mobile : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('mobile')), 'LIKE', '%' + userFiter.mobile + '%'),
            // userTypeId: userFiter.userTypeId
        },
        Sequelize.or(
            {email : Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + userFiter.email + '%')},
            {email : null}
        )
        )});

        return res.send(handlers.responseHandler.buildResponse(userData));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function getUser(req, res, next){
    
    try{

        const user = await User.findOne({where:{
            id: req.params.id
        }});

        return res.send(handlers.responseHandler.buildResponse(user));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function getExcel(req, res, next){
    try{

        const userData = await User.findAll({
            attributes:['name', 'email', 'mobile', 'gender', 'isActive']
        });

        const jsonData = JSON.parse(JSON.stringify(userData));

        res.xls('data.xlsx', jsonData);
        // res.send(userData);
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function setFeedback(req, res, next){
    
    try{

        var model = {
            userId: req.decode.id,
            msg: req.body.msg,
            tripId: req.body.journeyId,
            date: new Date(req.body.date)
        }

        model = removeEmpty(model);
       
        const modelData = await Feedback.create(model);

        return res.send(handlers.responseHandler.buildResponse({"msg": "feedback saved"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function getFeedback(req, res, next){
    
    try{

        const modelData = await Feedback.findAll({
            include:[{model: User, as: 'user', paranoid: false, required: false, attributes:["name"]},
            {model: Trip, as: 'trip', paranoid: false, required: false, attributes:["name"]}
            ],
            order:[['createdAt', 'DESC']]
        });

        return res.send(handlers.responseHandler.buildResponse(modelData));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}



async function setRating(req, res, next){
    
    try{

        var model = {
            userId: req.decode.id,
            rating: req.body.rating
        }

        const modelData = await Rating.create(model);

        return res.send(handlers.responseHandler.buildResponse({"msg": "rating saved"}));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function getRating(req, res, next){
    
    try{
        const modelData = await Rating.findAll();

        return res.send(handlers.responseHandler.buildResponse(modelData));
    }catch (e){
        console.log('error',e);
        next(e)
    }

}


async function getDashboard(req, res, next){
    
    try{

        //total journey
        const journeyCount = await Trip.findAndCountAll({where: {isActive: true}});
        //total vehicle
        const vehicleCount = await Vehicle.findAndCountAll({where: {isActive: true}});

        //total customer
        const customerCount = await User.findAndCountAll();

        //total booking
        const totalSuccessBooking = await Booking.findAndCountAll({where:{status: BookingStatus.completed}});

        const totalFailedBooking = await Booking.findAndCountAll({where:{status: BookingStatus.failed}});

        const totalBooking = await Booking.findAndCountAll();

        const totalNotification = await AdminNotification.findAndCountAll();
        

        const data = {
            totalCustomer: customerCount.count,
            totalJourney: journeyCount.count,
            totalVehicle: vehicleCount.count,
            totalBooking: totalBooking.count,
            totalSuccessBooking: totalSuccessBooking.count,
            totalFailedBooking: totalFailedBooking.count,
            totalNotification: totalNotification.count
        }

        return res.send(handlers.responseHandler.buildResponse(data));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}




async function sos(req, res, next){
    
    try{

        const message =  req.body.message ?  req.body.message : ""

        const severity = 1

        const sosData = await AdminNotification.create({
            payload: message,
            severity: severity,
            reportedFromId: req.decode.id
        });

        return res.send(handlers.responseHandler.buildResponse(sosData));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}



async function userExist(req, res, next){
    
    try{

        var filterData = {
            mobile: req.body.mobile,
            email: req.body.email
        }

        const user = await User.findOne({where: removeEmpty(filterData)});
        
        if (!user) return res.send(handlers.responseHandler.buildResponse({"exist": false}));

        return res.send(handlers.responseHandler.buildResponse({"exist": true}));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


async function getUserType(req, res, next){
    
    try{

        var userType = await UserType.findAll({
            attributes: ['name']
        });

        return res.send(handlers.responseHandler.buildResponse(userType));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}

async function checkSuperAdmin(req, res, next){
    
    try{

        var userTypeid = await User.findOne({
            attributes: ['userTypeId'],
            where:{
                id:req.body.id
            }
        });
        console.log("FUNCIONA!")
        return res.send(handlers.responseHandler.buildResponse(userTypeid));
    }catch (e){
        console.log('error',e);
        next(e)
    }
}


module.exports = {
    signup,
    fbSignup,
    googleSignup,
    login,
    fbLogin,
    googleLogin,
    logout,
    resetPassword,
    bookingHistory,
    checkSuperAdmin,
    addToken,
    profileGet,
    profileUpdate,
    adminProfileUpdate,
    addSuggestion,
    getSuggestion,
    notification,
    addPreferredLocation,
    getPreferredLocation,
    downloadImage,
    all,
    getUser,
    filtered,
    getExcel,
    setFeedback,
    getFeedback,
    setRating,
    getRating,
    updateProfileImage,
    getDashboard,
    sendNotification,
    getAllNotification,
    sos,
    getImage,
    adminUpdateProfileImage,
    addConsumer,
    getSuggestion,
    userExist,
    otpLogin,
    getUserType
} 


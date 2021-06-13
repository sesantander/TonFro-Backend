const exceptionHandler = require('../../core/handlers').errorHandler;

const getErrors = (data) => {
    return exceptionHandler.validationErrors(data.mapped());
};

function signup(req, res, next) {
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
        token:{
            notEmpty: true,
            errorMessage: "invalid token"
        },
        gender:{
            notEmpty: true,
            errorMessage: "invalid gender"
        },
        userType:{
            notEmpty: true,
            errorMessage: "invalid user type"
        },
        deviceId: {
            notEmpty: true,
            errorMessage: "device uniquie id required"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function fbSignup(req, res, next) {

    console.log('reach to the fb signup');
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
        access_token:{
            notEmpty: true,
            errorMessage: "invalid token"
        },
        gender:{
            notEmpty: true,
            errorMessage: "invalid gender"
        },
        userType:{
            notEmpty: true,
            errorMessage: "invalid user type"
        },
        deviceId: {
            notEmpty: true,
            errorMessage: "device uniquie id required"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function googleSignup(req, res, next) {
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
        token:{
            notEmpty: true,
            errorMessage: "invalid token"
        },
        gender:{
            notEmpty: true,
            errorMessage: "invalid gender"
        },
        userType:{
            notEmpty: true,
            errorMessage: "invalid user type"
        },
        deviceId: {
            notEmpty: true,
            errorMessage: "device uniquie id required"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function addConsumer(req, res, next) {
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
        },
        deviceId: {
            notEmpty: true,
            errorMessage: "device uniquie id required"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function login(req, res, next) {
    let bodySchema = {
        password: {
            notEmpty: true,
            errorMessage: "invalid password"
        },
        mobile: {
            notEmpty: true,
            errorMessage: "invalid mobile number"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function otpLogin(req, res, next) {
    let bodySchema = {
        token:{
            notEmpty: true,
            errorMessage: "invalid token"
        },
        mobile: {
            notEmpty: true,
            errorMessage: "invalid mobile number"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function userExist(req, res, next) {
    let bodySchema = {
        mobile: {
            notEmpty: true,
            errorMessage: "invalid mobile number",
            optional: true
        },
        email: {
            notEmpty: true,
            errorMessage: "invalid email number",
            optional: true
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}




function resetPassword(req, res, next) {
    let bodySchema = {
        newPassword: {
            notEmpty: true,
            errorMessage: "invalid password"
        },
        mobile:{
            notEmpty: true,
            errorMessage: "invalid mobile number"
        },
        token:{
            notEmpty: true,
            errorMessage: "invalid token"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function fbLogin(req, res, next) {

    let bodySchema = {
        access_token: {
            notEmpty: true,
            errorMessage: "invalid fb token"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function googleLogin(req, res, next) {
    let bodySchema = {
        googleToken: {
            notEmpty: true,
            errorMessage: "invalid google token"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function addToken(req, res, next) {

    let bodySchema = {
        pushToken: {
            notEmpty: true,
            errorMessage: "invalid push token"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}





function bookingHistory(req, res, next) {
    next();
}

function profileGet(req, res, next) {
    next();
    // let bodySchema = {
    //     pushToken: {
    //         notEmpty: true,
    //         errorMessage: "invalid push token"
    //     }
    // };

    // req.checkBody(bodySchema);

    // req.getValidationResult().then(function (result) {
    //     if (false === result.isEmpty())
    //         return res.status(400).json(getErrors(result));
    //     next();
    // });
}

function profileUpdate(req, res, next) {

    next();
    // let bodySchema = {

    // };

    // req.checkBody(bodySchema);

    // req.getValidationResult().then(function (result) {
    //     if (false === result.isEmpty())
    //         return res.status(400).json(getErrors(result));
    //     next();
    // });
}



function adminProfileUpdate(req, res, next) {

    let bodySchema = [{
        userId: {
            notEmpty: true,
            errorMessage: "invalid  userId"
        }
    }];

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function addSuggestion(req, res, next) {

    let bodySchema = [{
        shift: {
            notEmpty: true,
            errorMessage: "invalid  shift"
        },
        time: {
            notEmpty: true,
            errorMessage: "invalid time"
        },
        point: {
            notEmpty: true,
            errorMessage: "invalid point"
        },  
    }];

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function getSuggestion(req, res, next) {

    next();
}


function notification(req, res, next) {

    next();

    // let bodySchema = {
    //     userId: {
    //         notEmpty: true,
    //         errorMessage: "invalid uesrId"
    //     },
    // };

    // req.checkBody(bodySchema);

    // req.getValidationResult().then(function (result) {
    //     if (false === result.isEmpty())
    //         return res.status(400).json(getErrors(result));
    //     next();
    // });
}

function addPreferredLocation(req, res, next) {

    let bodySchema = [{
        name: {
            notEmpty: true,
            errorMessage: "invalid location name"
        },
        location: {
            notEmpty: true,
            errorMessage: "invalid location"
        },
    }];

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function getPreferredLocation(req, res, next) {
next();
}


function downloadImage(req, res, next) {

    let bodySchema = {
        imageUrl: {
            notEmpty: true,
            errorMessage: "invalid image name"
        },
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function setFeedback(req, res, next) {

    let bodySchema = {
        msg: {
            notEmpty: true,
            errorMessage: "msg should not be empty"
        },
        date:{
            notEmpty: true,
            errorMessage: "invalid date"
        },
        journeyId:{
            notEmpty:true,
            optional: true,
            errorMessage: "journey id should not be invalid"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function setRating(req, res, next) {

    let bodySchema = {
        
        rating:{
            notEmpty:true,
            errorMessage: "invalid rating"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}

function sendNotification(req, res, next) {

    let bodySchema = {
        message:{
            notEmpty:true,
            errorMessage: "invalid message"
        },
        userIds:[{
            notEmpty:true,
            errorMessage: "invalid userids",
            optional: true
        }]
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}


function getAllNotification(req, res, next) {

    let bodySchema = {
        limit:{
            notEmpty:true,
            errorMessage: "invalid limit"
        },
        offset:{
            notEmpty:true,
            errorMessage: "invalid offset",
            optional: true
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}



function sos(req, res, next) {

    let bodySchema = {
        message:{
            notEmpty:true,
            optional: true,
            errorMessage: "invalid limit"
        }
    };

    req.checkBody(bodySchema);

    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty())
            return res.status(400).json(getErrors(result));
        next();
    });
}



function adminUpdateProfileImage(req, res, next) {

    next();
    // let bodySchema = {
    //     userId:{
    //         notEmpty:true,
    //         errorMessage: "invalid user ID"
    //     }
    // };

    // req.checkBody(bodySchema);

    // req.getValidationResult().then(function (result) {
    //     if (false === result.isEmpty())
    //         return res.status(400).json(getErrors(result));
    //     next();
    // });
}


module.exports = {
    signup,
    fbSignup,
    googleSignup,
    login,
    fbLogin,
    googleLogin,
    resetPassword,
    bookingHistory,
    addToken,
    profileGet,
    profileUpdate,
    adminProfileUpdate,
    addSuggestion,
    notification,
    addPreferredLocation,
    getPreferredLocation,
    downloadImage,
    setFeedback,
    setRating,
    sendNotification,
    getAllNotification,
    sos,
    adminUpdateProfileImage,
    addConsumer,
    getSuggestion,
    userExist,
    otpLogin
}
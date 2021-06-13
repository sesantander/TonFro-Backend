module.exports = {
    INVALID_TOKEN:{
        statusCode: 409,
        message: " Invalid access token"
    },
    MISSING_USER_TYPE:{
        statusCode: 402,
        message: "User Type is Required."
    },
    INVALID_USER_TYPE:{
            statusCode: 403,
            message: "User Type is not valid."
        },
    INVALID_EMAIL_ID:{
            statusCode: 404,
            message: "Email id is not valid."
        },
    USER_ALREADY_EXISTS:{
        statusCode: 410,
        message: "User is already exists"
    },
    EMAIL_ALREADY_EXISTS: {
            statusCode: 405,
            message: "Email id is already used by another user."
        },
        INVALID_FIREBASE_TOKEN_ERROR:{
            statusCode: 411,
            message: "Firebase token is invalid."
        },
        INVALID_GOOGLE_TOKEN_ERROR:{
            statusCode: 411,
            message: "Google token is invalid."
        },
        INVALID_FB_TOKEN_ERROR:{
            statusCode: 411,
            message: "Google token is invalid."
        },
    TOKEN_GEN_ERROR:{
            statusCode: 407,
            message: "Error in JWT token Generation."
        },
    TOKEN_NOT_FOUND: {
            statusCode: 408,
            message: "JWT token is missing."
        },
    USER_NOT_FOUND:{
        statusCode: 410,
        message: "User not found"
    },
    USER_NOT_LOGGED_IN:{
        statusCode: 421,
        message: "User not logged in."
    },
    EMPTY_MOBILE:{
        statusCode : 420,
        message: "Mobile number is missing"
    },
    INVALID_MOBILE:{
        statusCode : 420,
        message: "Mobile number is invalid"
    },
    EMPTY_PASSWORD:{
        statusCode : 420,
        message: "Mobile number is missing"
    },
    INVALID_PASSWORD: {
        statusCode: 406,
        message: "Password is not valid."
    },
    INVALID_SUGGESTION: {
        statusCode: 406,
        message: "suggestion is not valid."
    },
    INVALID_NOTIFICATION: {
        statusCode: 406,
        message: "notification is not valid."
    },
    INVALID_LOCATION: {
        statusCode: 406,
        message: "invalid location found."
    },INVALID_URL: {
        statusCode: 406,
        message: "invalid Url."
    },INVALID_USER_TYPE: {
        statusCode: 406,
        message: "invalid User type provided."
    },EMPTY_NOTIFICATION_TOKEN: {
        statusCode: 406,
        message: "Empty User push notification tokens."
    },

}
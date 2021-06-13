const jwt = require('../../services').jwtService;
const {UserTypeENUM, whitelist} = require('../constants');
const exception = require('../../core/exceptions');
const config = require("../../config");
const {Logger} = require('../utility');
const {Session} = require('../db/models');


async function jwtAuthentication(req, res, next) {

    Logger.info('reqcieved request for url', req.url);
    Logger.info('request body', req.body);
    Logger.info('request param', req.params);
    Logger.info('request header', req.headers);

    var isWhitelisted = whitelist.includes(req.url);

    /**
     * @description For whitlisted paths jwt tokens are not required.
     * Some public paths (isWhitelisted) are defined in constants for which authentication is not required.
     */
    if (isWhitelisted) return next();

    const userType = req.headers['user-type'];
    const userTypeArr = Object.values(UserTypeENUM);
    /**
     * @description {Check-1} user-type existance check.
     * user-type must exixts in header otherwise it will return with exception.
     */
    if (!userType) return next(exception.User.MISSING_USER_TYPE);

    /**
    * @description {Check-2} invalid user-type check.
    */
    if (!userTypeArr.includes(userType)) return next(exception.User.INVALID_USER_TYPE);

    const token = req.body.token || req.query.token || req.headers['token'];
    const jwtConfig = config.jwt;//commonUtils.getConfig(userType);
    console.log(token,jwtConfig);

    /**
    * @description {Check-3} Token Existance check.
    */
    if (!token) return next(exception.User.TOKEN_NOT_FOUND);

    /**
     * @description {Check-4} This function will verify the given token is valid or not.
     * It also verify the token validity via redis.If any exception accurs it will return with the exception.
     */
    jwt.verify(token, jwtConfig.key)
        .then(async (decode) => {
            req.decode = decode; // [TO DO] Need to check its value
            
            const user  = await Session.findOne({where:{
                userId:decode.id
            }});

            Logger.info('user verified in successfully')

            if (!user){
                return next(exception.User.USER_NOT_LOGGED_IN);
            }

             return next();
        })
        .catch(error => {
            next(error);
        })
}

module.exports = jwtAuthentication;
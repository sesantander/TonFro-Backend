const fbConfig = require('../config').fb;
const Passport = require('passport');
const FBStrategy = require('passport-facebook-token');
const {Logger} = require('../core/utility');

class FBService {
    constructor(){

        Passport.use(new FBStrategy({
            clientID: fbConfig.api_key,
            clientSecret: fbConfig.api_secret,
        },
        function (accessToken, refreshToken, profile, done) {
                Logger.info("fb data info", {
                    accessToken,
                    refreshToken,
                    profile
                });

                const { email, mobile} = profile._json;

                done(null, {
                        email,
                        mobile
                });
          }));
    }
}


module.exports = new FBService();
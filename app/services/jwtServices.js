const jwt = require('jsonwebtoken');
const jwtConfig = require('../config').jwt; 
const exception = require('../core/exceptions').User;

class JWTToken {
    getToken(user){
        return jwt.sign({mobile: user.mobile, type: user.userType, id: user.id}, jwtConfig.key);
    }

    isValid(token){
            return jwt.verify(token, jwtConfig.key);
    }

    verify(token, secret){
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) reject(exception.INVALID_TOKEN);
                resolve(decoded);
            });
        })
    }
}

module.exports = new JWTToken();
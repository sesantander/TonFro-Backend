const bcrypt = require('bcrypt');
const bcryptConfig = require('../config').bcrypt;


class Bcrypt{
    generatePassword(password){
        return bcrypt.hash(password, bcryptConfig.saltRounds);
    }

    isPasswordMatch(password, plainPassword){
        return bcrypt.compare(plainPassword, password);
    }
}

module.exports = new Bcrypt();
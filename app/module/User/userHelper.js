const bcrypt = require('../../services').bcryptService;
const jwtService =  require('../../services').jwtService;


async function getUser(user) {
    const password = await bcrypt.generatePassword(user.password);
    return {
        mobile: user.mobile,
        password: password,
        gender: user.gender,
        name: user.name,
        userTypeId: user.userType,
        deviceId: user.deviceId,
        email: user.email,
        emailVerified: user.emailVerified ? user.emailVerified : false,
        mobileVerified: user.mobileVerified ? user.mobileVerified : false
    };
}

async function isValidPassword(password, user){
    return bcrypt.isPasswordMatch(user.password, password);
}

async function getSignInObject(user){
    return {
        token: jwtService.getToken(user),
        user: {
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            emailVerified: user.emailVerified,
            gender: user.gender,
            image: user.image,
            userType: user.userType,
            id:user.id
        }
    };
}

async function getHash(password){
    return await bcrypt.generatePassword(password);
}

module.exports = {
    getUser,
    isValidPassword,
    getSignInObject,
    getHash
}
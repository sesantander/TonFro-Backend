const {OAuth2Client} = require('google-auth-library');
const googleConfig = require('../config').googleSignIn;


class GoogleSignIn{  

    constructor(){
        this.client = new OAuth2Client(googleConfig.client);
    }


    verify(token){
        return this.client.verifyIdToken({
            idToken: token,
            audience: googleConfig.clients
        });
    }

};

module.exports = new GoogleSignIn();


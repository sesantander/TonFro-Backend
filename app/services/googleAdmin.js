const admin = require('firebase-admin');
const googleConfig = require('../config').google_admin;

class FirebaseAdmin{  

    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(googleConfig.config),
            databaseURL: googleConfig.db
        }); 
    }


    verify(token){
        return admin.auth().verifyIdToken(token);
        // return {phone_number: token};
    }

    send(message, token){
        return this.sendToAll(message, [token]);
    }

    sendToAll(message, tokens){
         var payload = {
             notification:{
                 title:'To N Fro Services',
                 body: message
             }
         }

         var options = {
            priority: 'high',
            timeToLive: 60 * 60
         }

        var msg = {
            data:message,
            token: tokens
        }
        return admin.messaging().sendToDevice(tokens, payload, options);
        // .sendMulticast(msg);
    }

    
};

module.exports = new FirebaseAdmin();


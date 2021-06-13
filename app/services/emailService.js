const emailConfig = require('../config').emailConfig;
const nodeMailer = require('nodemailer');

class Emailer{  

    constructor(){
          this.transporter = nodeMailer.createTransport({
            // service: 'gmail',//emailConfig.service,
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.secure,
            requireTLS: emailConfig.requireTLS,
            auth:{
                user: emailConfig.auth.user,
                pass: emailConfig.auth.pass
            }
        });

        console.log('transporter created');

        // transporter.sendMail({
        //     from: emailConfig.auth.user,
        //     to:'sharma.1413@gmail.com',
        //     subject: 'new mailer send test',
        //     text: 'Helllo mail sent successfully'
        // }, function(error, info){
        //     console.log('email error', error);
        //     console.log('email info', info);
        // });

        // this.send('sharma.1413@gmail.com', 'Helllo mail sent successfully');
    }

    send(to, text){
        transporter.sendMail({
            from: emailConfig.auth.user,
            to:to,
            subject: 'new mailer send test',
            text: text
        })
    }
};

module.exports = new Emailer();


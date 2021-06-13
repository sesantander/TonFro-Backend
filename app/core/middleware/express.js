const bodyParser = require('body-parser');
const helmet = require('helmet');
const validator = require('express-validator');
const cors = require('cors');

module.exports = function (app){

    app.use(cors());

    //body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    //helmet security
    // Added xssFilter to prevent Cross-site scripting
    app.use(helmet.xssFilter());

    // Added frameguard to mitigates clickjacking attacks
    app.use(helmet.frameguard());

    app.use(validator({customValidators: {}}));

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user-type,token");
        next();
    });
};
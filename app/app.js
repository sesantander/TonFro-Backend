const express = require('express');
const app = express();
const middleware = require('./core/middleware');
const route = require('./module/api routes');
const exceptionHandler = require('./core/handlers').errorHandler;
const path = require('path');
const json2xls = require('json2xls');
const models = require('./core/db/models');
const {Logger} = require('./core/utility');
const {fbService} = require('./services');

//logging middleware
// app.use(middleware.logger);

//middleware
middleware.express(app);
// middleware.security(app);

app.use('/getImage',express.static(path.join(__dirname, 'images')));


app.use(middleware.security);

//xls router
app.use(json2xls.middleware);

//db initialisation
models.sequelize.authenticate()
.then(()=>{
    console.log('db connected successfully');

}).catch((error)=>{
    console.log(`unable to connect db due to ${error}`);
});


//routes
route(app);


//exceptions
// app.use('/temp',[
//   check('name').exists()
// ], function(req, res){
//     const error = validationResult(req);
//     res.send({error});
// });


app.use(exceptionHandler.unknownRouteHandler);

app.use(exceptionHandler.errorHandler);



module.exports = app;





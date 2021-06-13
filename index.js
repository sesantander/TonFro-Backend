const app = require('./app/app');
//const app = require('express')();
const http = require('http');
const port = require('./app/core/constants').port;
// const sequelize = require('./app/core/db').sequelize;


http.createServer(app).listen((port), function(){
    console.log('app start on server port', port);
});

// sequelize.authenticate()
// .then(()=>{
//     console.log('db connected successfully');

// }).catch((error)=>{
//     console.log(`unable to connect db due to ${error}`);
// });





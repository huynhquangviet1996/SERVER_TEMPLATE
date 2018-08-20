var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000 ;
    bodyParser = require('body-parser');
    config = require('./src/config');
    routes = require('./src/routers');
    // initModel = require('./src/models/employeesModel');
    connectdb = require('./src/db');
var passport = require('passport');

// mongoose instance connection url connection
connectdb()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit : config.bodyLimit
}));
//CORS-ENABLE
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//authentication
app.use(passport.initialize());
routes(app);
app.listen(port);

console.log('ABBA RESTful API server started on: ' + port);
// import http from 'http';
// import express from 'express';
// import bodyParser from 'body-parser';
// import config from './src/config/index';
// import routers from './src/routers/index';
// let app = express();
// app.server = http.createServer(app);
//
// //middleware
//
// app.use(bodyParser.json({
//     limit : config.bodyLimit
// }))
// //passport config
//
// //api router v1
//
// app.use('/api',routers);
//
// app.server.listen(config.port,config.address);
// console.log(`Started on port localhost:3000`);
//
// export default app;
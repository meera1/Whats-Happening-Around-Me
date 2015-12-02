'use strict';

//// Requires meanio
//var mean = require('meanio');
//
//// Creates and serves mean application
//mean.serve({ /*options placeholder*/ }, function(app, config) {
//  console.log('Mean app started on port ' + config.http.port + ' (' + process.env.NODE_ENV + ')');
//  if(config.https && config.https.port){
//    console.log('Mean secure app started on port ' + config.https.port + ' (' + process.env.NODE_ENV + ')');
//  }
//});

var express = require('express');
var app = express();

var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/eventappDb';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

//mongoose.connect(connectionString);
//var db = mongoose.connection;
var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + ''));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./packages/system/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);







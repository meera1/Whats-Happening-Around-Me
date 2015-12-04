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
var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');

var app = express();
var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/eventappDb';
var db = mongoose.connect(connectionString);

//var db = mongoose.connection;
//var db = mongoose.connect('mongodb://localhost/oauth2+angular');

app.use(express.static(__dirname + '/packages/system/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer());
app.use(session({ secret: 'this is the secret' }));

// resave: true,
//  saveUninitialized: true
//})); // encrypted, sign the session id with this given string only if u have this string u can use it; paswd for session id
app.use(cookieParser());  // parse cookie and create a map we can use
app.use(passport.initialize());
app.use(passport.session()); // U NEED TO CONFIGURE PASSPORT'S SESSION AFTER U CONFIGURE EXPRESSES SESSION. THIS ORDER IS VERY IMP


require("./packages/system/server/app.js")(app, mongoose, db);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);



// Describing the schema

//   var UserSchema = new mongoose.Schema({
//        "userID": String,
//        "first": String,
//        last: String,
//        company: String,
//        email: String,
//        time-zone: {type: Date, enum: ['(GMT-10:00) Hawaii', '(GMT-09:00) Alaska', '(GMT-08:00) Pacific Time (US &amp; Canada)','(GMT-07:00) Arizona','(GMT-07:00) Mountain Time (US & Canada', '(GMT-06:00) Central Time (US & Canada)','(GMT-05:00) Eastern Time (US & Canada)','(GMT-05:00) Indiana (East)']}
//        username: String,
//        password: String,
//        confirm-password: String,
//        likes: [String],
//        dislikes: [String],
//        "eventID": [Number]
//        reviews: [{eventID: Number , comment: String}]  // or make a event schema having userID and his comments like below
//    }, { collection: "UserModel" });
//

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    email: String
}, {collection: "User"});


var User = mongoose.model("User", UserSchema);


var auth = function (req, res, next) {

    if (!req.isAuthenticated()) {
        res.send(401);
    }
    else
        next();
};



passport.use(new LocalStrategy(
    function (username, password, done) {

        User.findOne({ username: username, password: password }, function (err, user) {
            if (user) {
                return done(null, user);

            }
            return done(null, false, { message: 'Unable to login' });

        });

    }
));


passport.serializeUser(function (user, done) {  // to encrypt
    done(null, user);

});

passport.deserializeUser(function (user, done) {  // to decrypt
    done(null, user);

});




app.post("/rest/login", passport.authenticate('local'), function (req, res) {

    var user = req.body;
    //console.log("cookies:  " + req.cookies);
    res.json(user);

});




app.post("/rest/user", function(req, res){

    var user = req.body;
    console.log("user from server " + user);

    User.findOne({username: user.username}, function(err, existingUser){

        if(existingUser == null)
        {
            User.create(user, function(err, newUser)
            {
                res.json(newUser);
            })

        }
        else
            res.json(null);
    });
});




app.get("/rest/user/:username", function(req, res){

    var username = req.params.username;
    User.find({username: username}, function(err, users)
    {
        res.json(users[0]);
    });

});


app.put("/rest/update/user", auth, function(req, res){
    var user = req.body;
    var username = req.params.username;
    var password = req.params.password;
    var fname = req.params.fname;
    var lname = req.params.lname;
    var email = req.params.email;

    console.log(user.username);


    User.findOne({ username: user.username}, function (error, doc) {
        if (doc) {
            console.log("Match found");
            doc.username = user.username;
            doc.password = user.password;
            doc.fname = user.fname;
            doc.lname = user.lname;
            doc.email = user.email;


            doc.save();

        }
        else {

            console.log("Error form updatin user profile in server:" + error);
            console.log("***************************************************");


        }


    });

    res.json(user);
    //    User.find({username: username}, function(err, users)
    //    {
    //        res.json(users[0]);
    //    });

});


app.post('rest/logout', function (req, res) {

    req.logOut();
    //req.session.destroy();
    res.send(200);
});



var CategoriesSchema = mongoose.Schema({
    "id": String,
    "name": String
}, {collection: "Categories"});


var CategoriesModel = mongoose.model("CategoriesModel", CategoriesSchema);


app.get("/api/wham/eventapp/categories", function (req, res) {

    CategoriesModel.find(function(err, categories) {
        res.json(categories);
    });
});
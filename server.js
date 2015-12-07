'use strict';

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');

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
var db = mongoose.connect(connectionString);
app.use(express.static(__dirname + '/packages/system/public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({ secret: 'this is the secret' }));

app.use(cookieParser());  // parse cookie and create a map we can use
app.use(passport.initialize());
app.use(passport.session()); // U NEED TO CONFIGURE PASSPORT'S SESSION AFTER U CONFIGURE EXPRESSES SESSION. THIS ORDER IS VERY IMP


require("./packages/system/server/app.js")(app, mongoose, db);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);

var globalLikeValue = 1;
var globalDislikeValue = -1;


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    email: String,
    preferences: [String]
}, {collection: "User"});

var User = mongoose.model("User", UserSchema);


var CategoriesSchema = mongoose.Schema({
    "id": String,
    "name": String
}, {collection: "Categories"});

var CategoriesModel = mongoose.model("CategoriesModel", CategoriesSchema);


var EventSchema = mongoose.Schema({
    "eventId": Number,
    "username": String,
    "choice": Number,
    "comment": String
});

var Events = mongoose.model("Events", EventSchema);





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
//    var email = user.email;
//    user.username = email;
    console.log("user from server " + user);

    User.findOne({$or: [{username: user.username}, {email: user.email}]}, function(err, existingUser){

        if(existingUser == null)
        {
            User.create(user, function(err, newUser)
            {
                req.login(newUser, function (err) {

                            if (err) {
                                return next(err);
                            }
                            res.json(newUser);
                        });
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
    var preferences = req.params.preferences;

    console.log(user.username);


    User.findOne({ username: user.username}, function (error, doc) {
        if (doc) {
            console.log("Match found");
            doc.username = user.username;
            doc.password = user.password;
            doc.fname = user.fname;
            doc.lname = user.lname;
            doc.email = user.email;
            doc.preferences = user.preferences;


            doc.save();

        }
        else {
            console.log("Error form updatin user profile in server:" + error);
            console.log("***************************************************");
        }


    });

    res.json(user);

});


app.post('/rest/logout', function (req, res) {

    req.logOut();
    res.send(200);
});

app.get('/rest/loggedin', function(req, res)
{
      res.send(req.isAuthenticated() ? req.user : '0');

});



app.get("/api/wham/eventapp/categories", function (req, res) {
    CategoriesModel.find(function(err, categories) {
        res.json(categories);
    });
});


app.post('/rest/like', auth, function(req, res){
        var username = req.body.username;
        var eventId = req.body.eventId;
        console.log("likes user " + username+ "  "+ eventId);
            Events.findOne({eventId: eventId, username: username}, function(err, existingEvent){

                if(existingEvent == null)
                {

                    var newEvent = new Events({
                    eventId: eventId,
                    username: username,
                    choice: globalLikeValue,
                    comments: null
                    });

                    newEvent.save(function (err, document) {
                    if (err) console.log(err);
                    else
                    {
                          console.log('Saved : ', document ) ;
                          res.json(document);
                          };
                    });


                }
                else
                    {
                        if(existingEvent.choice == 1)
                        {
                            Events.findByIdAndUpdate(
                            existingEvent._id,
                            { $set: { choice: 0 } },
                             function (err, document) {
                              if (err) console.log("Error in updating event with likes "+ err);
                              else res.json(document);
                        });
                        }
                        else
                        {
                           Events.findByIdAndUpdate(
                           existingEvent._id,
                           { $set: { choice: globalLikeValue } },
                            function (err, document) {
                             if (err) console.log("Error in updating event with likes "+ err);
                             else res.json(document);
                        });
                        }

                        }

                    });

});




app.post('/rest/dislike', auth, function(req, res){
        var username = req.body.username;
        var eventId = req.body.eventId;
        console.log("dislikes user " + username+ "  "+ eventId);
            Events.findOne({eventId: eventId, username: username}, function(err, existingEvent){

                if(existingEvent == null)
                {

                    var newEvent = new Events({
                    eventId: eventId,
                    username: username,
                    choice: globalDislikeValue,
                    comments: null
                    });

                    newEvent.save(function (err, document) {
                    if (err) console.log(err);
                    else
                    {
                          console.log('Saved : ', document ) ;
                          res.json(document);
                          };
                    });


                }
                else
                    {
                        if(existingEvent.choice == -1)
                        {
                           Events.findByIdAndUpdate(
                           existingEvent._id,
                           { $set: { choice: 0 } },
                            function (err, document) {
                             if (err) console.log("Error in updating event with dislikes "+ err);
                             else res.json(document);
                           });
                        }
                        else
                        {
                            Events.findByIdAndUpdate(
                            existingEvent._id,
                            { $set: { choice: globalDislikeValue } },
                             function (err, document) {
                              if (err) console.log("Error in updating event with dislikes "+ err);
                              else res.json(document);
                            });
                        }


                    };
            });
});





app.get("/rest/:username/event/:id/check", auth, function(req,res){

    var username = req.params.username;
    var eventId = req.params.id;

    console.log(username+"   "+ eventId+ "from server checking likes and dislikes");
    Events.findOne({eventId: eventId, username: username}, function(err, existingEvent){

      if(existingEvent == null)
      {

      var choice = 0;

      res.json(choice);


      }
      else
      {
      var choice = existingEvent.choice;
      res.json(choice);


      }
      });

});


var q = require("q");

module.exports = function(mongoose, db){

    var EventSchema = mongoose.Schema({
        "userID":String,
        "eventID":String
    },{collection: "likes"});

    var EventSchemaForComment = mongoose.Schema({
            "userID":String,
            "eventID":String,
            "comment":String
        },{collection: "comments"});


/*
var mongoose = require('./index')
  , TempSchema = new mongoose.Schema({
      salutation: {type: String, enum: ['Mr.', 'Mrs.', 'Ms.']}
    });

var Temp = mongoose.model('Temp', TempSchema);

console.log(Temp.schema.path('salutation').enumValues);
var temp = new Temp();
console.log(temp.schema.path('salutation').enumValues);
*/
//    var UserSchema = new mongoose.Schema({
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



//    var UserModel = mongoose.model("UserModel", UserSchema);

/*
    var EventSchema = new mongoose.Schema({
        eventID: Number,
        reviews: [{userID: Number , comment: String}]
    ), { collection: "EventModel", EventSchema });
*/

    var EventModel = mongoose.model("EventModel", EventSchema);

    var EventModelForComments = mongoose.model("EventModelForComments", EventSchemaForComment)

    var api = {

        addLikeForEvent : addLikeForEvent,
        addCommentForEvent: addCommentForEvent
    };

    return api;

    function addLikeForEvent(likeForEvent){

        var deferred = q.defer();

        EventModel.create(likeForEvent, function(err, doc){

            EventModel.find(err, function(err, response){

                deferred.resolve(response);

            });

        });

        return deferred.promise;

    }

    function addCommentForEvent(commentForEvent){

            var deferred = q.defer();

            EventModelForComments.create(commentForEvent, function(err, doc){

                EventModelForComments.find(err, function(err, response){

                    deferred.resolve(response);

                });

            });

            return deferred.promise;

        }

//        function findUser(user){
//
//        UserSchema.findOne({ username: req.body.username }, function (err, user) {
//                if (user) {
//                    res.send(user);
//
//                }
//                else {
//
//                    res.send("0");
//
//                }
//
//
//            });
//        }

};
var q = require("q");

module.exports = function(mongoose, db){

    var EventSchema = mongoose.Schema({
        "userID":String,
        "eventID":String
    },{collection: "likes"});

    var EventSchemaForComment = mongoose.Schema({
            "userID":String,
            "eventID":String,                             "comment":String
        },{collection: "comments"});


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
var q = require("q");

module.exports = function(mongoose, db){

    var EventSchema = mongoose.Schema({
        "userID":String,
        "eventID":String
    },{collection: "likes"});

    var EventModel = mongoose.model("EventModel", EventSchema);

    var api = {

        addLikeForEvent : addLikeForEvent
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

};
module.exports = function(app, model){

    app.post("/api/wham/eventapp/user/:userId/event/:eventId/like", addLikeForEvent);

    function addLikeForEvent(req, res){

            console.log("now here at server");

            var userID = req.params.userId;

            var eventID = req.params.eventId;

            console.log("userId: " + userID);

            console.log("eventId: "+ eventID);

            var likeForEvent = {
                        userID: userID,
                        eventID: eventID
            };


//            res.json(likesForEvent);

            model
                .addLikeForEvent(likeForEvent)
                .then(function(response){

                    res.json(response);

                });
    }

};
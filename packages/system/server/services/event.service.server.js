module.exports = function(app, model){

    app.post("/api/wham/eventapp/user/:userId/event/:eventId/like", addLikeForEvent);

    app.post("/api/wham/eventapp/user/:userId/event/:eventId/comment/:comment", addCommentForEvent);




    function addLikeForEvent(req, res){

            var userID = req.params.userId;

            var eventID = req.params.eventId;

            var likeForEvent = {
                        userID: userID,
                        eventID: eventID
            };

            model
                .addLikeForEvent(likeForEvent)
                .then(function(response){

                    res.json(response);

                });
    }

    function addCommentForEvent(req, res){

                console.log("now here at server");

                var userID = req.params.userId;

                var eventID = req.params.eventId;

                var comment = req.params.comment;

                console.log("userId: " + userID);

                console.log("eventId: "+ eventID);

                console.log("comment: " + comment);


                var commentForEvent = {
                            userID: userID,
                            eventID: eventID,
                            comment: comment
                };

                model
                    .addCommentForEvent(commentForEvent)
                    .then(function(response){
    
                        res.json(response);

                    });
        }

//
//        function loginUser (req, res) {
//
//            var user = req.body;
//            //console.log("cookies:  " + req.cookies);
//            model
//                .findUser(user)
//                .then(function(response){
//
//                    res.json(response);
//
//                });
//
//        };
//
//
//        function logoutUser (req, res) {
//
//            req.logout();
//            res.send(200);
//        };


};
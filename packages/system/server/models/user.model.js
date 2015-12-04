   var q = require("q");

   module.exports = function(mongoose, db){



     var UserSchema = new mongoose.Schema({
        userID: Number,
        username: String,
        password: String


        }, {collection: "UserModelTemp"});



    function findUser(user){

        UserSchema.findOne({ username: req.body.username }, function (err, user) {
                if (user) {
                    res.send(user);

                }
                else {

                    res.send("0");

                }


            });
        }


        };

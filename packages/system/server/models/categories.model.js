var q = require("q");

module.exports = function(mongoose, db){

    var CategoriesSchema = mongoose.Schema({
        "id":String,
        "name":String
    },{collection: "Categories"});

    var CategoriesModel = mongoose.model("CategoriesModel", CategoriesSchema);

    var api = {
        insertCategories : insertCategories
        //retrieveCategories : retrieveCategories
    };

    return api;

    function insertCategories(categories){
        var deferred = q.defer();
        CategoriesModel.create(categories, function(err, doc){

            CategoriesModel.find(err, function(err, response){
                deferred.resolve(response);
            });

        });

        return deferred.promise;
    }

    //function retrieveCategories(){
    //    return CategoriesModel.find();
    //}

};
var q = require("q");

module.exports = function(mongoose, db){

    var CategoriesSchema = mongoose.Schema({
        "categoryId":String,
        "categoryName":String
    },{collection: "Categories"});

    var CategoriesModel = mongoose.model("CategoriesModel", CategoriesSchema);

    var api = {
        insertCategories : insertCategories
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
};
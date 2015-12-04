module.exports = function (app, model) {

    app.post("/api/wham/eventapp/category/:id/:name", insertCategories);
    //app.get("/api/wham/eventapp/categories", retrieveCategories);

    function insertCategories(req, res) {
        var id = req.params.id;
        var name = req.params.name;

        var category = {
            id: id,
            name: name
        };

        model
            .insertCategories(category)
            .then(function (response) {
                res.json(response);
            });
    }

    //function retrieveCategories(req, res) {
    //    var mdlData = model.retrieveCategories();
    //    for (var i= 0, len = mdlData.length; i < len; i++ ){
    //        console.log("service server data :: " + mdlData[i].categoryName);
    //    }
    //    res.json(mdlData);
    //
    //    //mdlData
    //    //    .then(function (response) {
    //    //        res.json(response);
    //    //    });
    //}

};
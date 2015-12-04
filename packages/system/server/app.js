module.exports = function(app, mongoose, db){

    var model = require("./models/event.model.js")(mongoose, db);
    //var categoriesModel = require("./models/categories.model.js")(mongoose, db);

    require("./services/event.service.server.js")(app, model);
    //require("./services/home.service.server.js")(app, categoriesModel);
};
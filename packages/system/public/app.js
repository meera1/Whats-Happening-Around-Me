(function(){

    angular
        .module("eventapp",["ngRoute"])
        .run(method);

        function method(){

            console.log("from app.js");

        }

})();
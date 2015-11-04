(function(){

    angular
        .module("eventapp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope){

        console.log("Inside Profile controller");
    }
})();


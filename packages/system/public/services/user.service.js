(function(){
    angular
        .module("eventapp")
        .factory("UserService", UserService);

    function UserService($http)
    {
        var service = {
            createUser: createUser,
            lookupUserByUsername: lookupUserByUsername,
            updateUser: updateUser,
            loginUser: loginUser,
            logoutUser: logoutUser

        };
        return service;

        function createUser(user, callback)
        {
            $http.post("/rest/user", user)
            .success(callback);
        }

        function lookupUserByUsername(username, callback)
        {
            console.log(username +" from user service");
            $http.get("/rest/user/"+username)
            .success(callback)
        }

        function updateUser(user, callback)
        {
            $http.put("/rest/update/user", user)
            .success(callback);
        }

        function loginUser(user, callback, errorCallback)
        {
            console.log("in service  "+ user.username);
            $http.post("/rest/login", user)
            .success(callback)
            .error(errorCallback);
        }

        function logoutUser(user, callback)
        {
            $http.post("/rest/logout")
            .success(callback);
        }

        }
    }
 )();
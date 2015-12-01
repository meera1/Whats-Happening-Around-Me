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
            $http.get("/rest/user/"+username)
            .success(callback)
        }


        function updateUser(user, callback)
        {
            $http.put("rest/update/user", user)
            .success(callback);
        }

        function loginUser(user, callback)
        {
            console.log("in service  "+ user.username);
            $http.post("rest/login", user)
            .success(callback);
        }

        function logoutUser(user, callback)
        {
            $http.put("/logout", user)
            .success(callback);
        }

        }
    }

)();
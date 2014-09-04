
window.deviceManager = angular.module('deviceManager', ['ui.router']);

// Configure routes
deviceManager.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider',
                      '$compileProvider', '$filterProvider', '$provide',
                       function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

    deviceManager.register =
    {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };

    deviceManager.registeredControllers = [];
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "App/Templates/Home.html",
            resolve: resolve("Home")
        })
        .state('users', {
            url: "/users",
            templateUrl: "App/Templates/Users.html",
            resolve: resolve("Users")
        });
}]);



function resolve(controllerName) {

    var controlBaseUrl = "/App/Controllers/";

    var createControlSrc = function(name) {
        return controlBaseUrl + name + ".js";
    }

    return {
        resoloveController: ["$q", function ($q) {

            var defer = $q.defer();
            var registeredControllers = deviceManager.registeredControllers;
            if (registeredControllers.indexOf(controllerName) == -1) {
                var jsElm = document.createElement("script");
                jsElm.type = "application/javascript";
                jsElm.src = createControlSrc(controllerName);
                $(jsElm).load(function() {
                    registeredControllers.push(controllerName);
                    defer.resolve();
                });
                document.body.appendChild(jsElm);
            } else {
                defer.resolve();
            }

            return defer.promise;
        }]
    }
}
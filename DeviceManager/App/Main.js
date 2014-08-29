window.deviceManager = angular.module('deviceManager', ['ngRoute']);

// Configure routes
deviceManager.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'App/Templates/Home.html', controller: 'HomeCtrl' }).
        when('/home', { templateUrl: 'App/Templates/Home.html', controller: 'HomeCtrl' }).
        otherwise({ redirectTo: '/home' });
}]);
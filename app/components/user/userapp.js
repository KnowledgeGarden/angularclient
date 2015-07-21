/**
 * Created by Admin on 6/2/2015.
 */
'use strict';
angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'app/components/user/user.html',
            controller: 'UserCtrl'
        });
    }])
    .controller('UserCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route',
        function($scope, $window, $location, configService, $cookieStore, $route) {
            console.log("UserCtrl");

}]);
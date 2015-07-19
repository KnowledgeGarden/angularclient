/**
 * Created by Admin on 6/2/2015.
 */
'use strict';
angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'components/user/user.html'
        });
    }]);
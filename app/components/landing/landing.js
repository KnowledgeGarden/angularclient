/**
 * Created by Admin on 5/29/2015.
 */
'use strict';

angular.module('myApp.landing', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/landing', {
            templateUrl: 'app/components/landing/landing.html'
        });
 //           $routeProvider.when('/', {
 //               templateUrl: 'app/components/landing/landing.html'
//            });
    }]);
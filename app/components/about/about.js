/**
 * Created by Admin on 5/29/2015.
 */
'use strict';

angular.module('myApp.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'app/components/about/about.html'
         });
    }]);
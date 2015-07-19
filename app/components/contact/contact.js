/**
 * Created by Admin on 5/29/2015.
 */
'use strict';

angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'app/components/contact/contact.html'
         });
    }]);
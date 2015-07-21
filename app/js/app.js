'use strict';

// Declare app level module which depends on views, and components

angular.module('Controllerizer',[])
.service('ApplicationService', function () {
    console.log("ApplicationService ");
    var isAuthenticated = false;
    var isNotAuthenticated = true;

 /*   isLoggedIn:  function(truth) {
        if (truth) {
            isAuthenticated = true;
            isNotAuthenticated = false;
        } else {
            isAuthenticated = false;
            isNotAuthenticated = true;
        }
    }; */
});

angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'Configurizer',
    'myApp.about',
    'myApp.landing',
    'myApp.contact',
    'myApp.admin',
    'myApp.user'//,
    //'Controllerizer'
]).
config(['$routeProvider', function($routeProvider) {

//      console.log("APP");
  $routeProvider.otherwise({redirectTo: '/landing'});
        //if you return to landing, then Applications toggle fails
}]).
controller('ApplicationController',  function ($scope, $cookieStore, $window) {
console.log("AppCtrl");

});



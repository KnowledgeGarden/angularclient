'use strict';


function getIp(callback) {
    $.ajax({
        type: 'GET',
        url: "http://jsonip.com?callback=?",
        dataType: 'jsonp',
        success: function(responseData, textStatus, jqXHR) {
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            callback(responseData, null);
        }
    });
};

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
    //portal configurations
    'Configurizer',
    //TopicMapProvider: makes REST calls to BacksideServlet
    'NodeProvider',
    "RelationProvider",
    'TopicMapProvider',
    'TagProvider',
    'myApp.about',
    'myApp.landing',
    'myApp.contact',
    'myApp.tago',
    'myApp.curation',
    'myApp.conversation',
    'myApp.admin',
    'myApp.user',
    'myApp.help'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/landing'});
    //if you return to landing, then Applications toggle fails
}]).
controller('ApplicationController',  function ($scope, $cookieStore, $window, tmprovider,
            configService, nodeprovider, relationprovider) {
    var undef;
    //initialize the topic map
    tmprovider.init(configService, nodeprovider, relationprovider);
    //sort out authentication stuff
    // uses cookies!!!
    $scope._userIP = "";
    getIp(function(err, response) {
        if (response !== null) {
            console.log("IP "+response.ip);
            $scope._userIP = response.ip;
        }
    });
    //set during authentication
    var uid = $cookieStore.get('uName');
    if (undef === uid) {uid = "";}
    $scope._userId = uid;
    $scope.isAdmin = false;
    $scope.isAuthenticated = false;
    $scope.isNotAuthenticated = true;

    var tok = $cookieStore.get('sToken');
    console.log("A "+(tok == undef));
    var truth = (tok !== undef && tok !== '');
    console.log("AC "+tok+" "+truth);
    if (truth) {
        $scope.sToken = tok;
        $scope.isAuthenticated = true;
        $scope.isNotAuthenticated = false;
        tok = $cookieStore.get('adminToken');
        if (tok !== undef && tok === 'T') {
            $scope.isAdmin = true;
        } else {
            $scope.isAdmin = false;
        }
    } else {
        $scope.sToken = "guest"; //required default token
        $scope.isAuthenticated = false;
        $scope.isNotAuthenticated = true;
        $scope.isAdmin = false;
    }
});



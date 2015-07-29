/**
 * Created by park on 7/27/2015.
 */
'use strict';
angular.module('myApp.curation', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/curate', {
            templateUrl: 'app/components/curate/curate.html',
            controller: 'CurateCtrl'
        });
    }])
    .controller('CurateCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route', 'tmprovider',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider) {

        }]);

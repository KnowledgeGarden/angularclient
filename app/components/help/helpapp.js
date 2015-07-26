/**
 * Created by park on 7/26/2015.
 */
angular.module('myApp.help', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/help/stash', {
            templateUrl: 'app/components/help/howtostash.html',
            controller: 'HelpCtrl'
        }).when('/help/bm', {
            templateUrl: 'app/components/help/howtobookmark.html',
            controller: 'HelpCtrl'
        });
    }])
    .controller('HelpCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route', 'tmprovider',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider) {
//Unlikely this will ever be used: all help pages are static
        }]);

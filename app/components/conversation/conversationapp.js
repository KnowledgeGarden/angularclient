/**
 * Created by park on 7/25/2015.
 */

angular.module('myApp.conversation', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/conversation', {
            templateUrl: 'app/components/conversation/convindex.html',
            controller: 'ConversationCtrl'
        }).when('/conversation/view', {
            templateUrl: 'app/components/conversation/conview.html',
            controller: 'ConversationCtrl'
        });
    }])
    .controller('ConversationCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route', 'tmprovider',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider) {

    }]);

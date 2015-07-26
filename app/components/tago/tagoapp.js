/**
 * Created by park on 7/25/2015.
 * BOOKMArk
 * javascript:location.href='http://<serverurl>/#/tago/bm?type=b&url='+
 *   encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)
 * STASH
 * javascript:location.href='http://localhost:8000/#/tago/stash?type=s&url='+
 *   encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)
 */
angular.module('myApp.tago', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tago', { //bookmark index
            templateUrl: 'app/components/tago/tagoindex.html',
            controller: 'TagoCtrl'
        }).when('/tago/bm', { // bookmark form from bookmarklets
            templateUrl: 'app/components/tago/tagoform.html',
            controller: 'TagoCtrl'
        }).when('/tago/stash', { //stash form
            templateUrl: 'app/components/tago/tagostashform.html',
            controller: 'TagoCtrl'
        }).when('/tago/view', { // bookmark view
            templateUrl: 'app/components/tago/tagoview.html',
            controller: 'TagoCtrl'
        });
    }])
    .controller('TagoCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route',
            'tmprovider', '$routeParams',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider, $routeParams) {
            ////////////////////////
            // Set things up
            ////////////////////////
            var undef, // way to test for 'undefined'
                url = $routeParams.url,  //bookmark
                title = $routeParams.title, //bookmark
                type = $routeParams.type, // bookmark type
                id =$routeParams.id;   //view

            console.log("TAGO "+type+" | "+url+" | "+title);
            //TAGO b | https://github.com/KnowledgeGarden/angularclient/wiki/Internal-API:-Creating-a-New-Topic
            // | Internal API: Creating a New Topic · KnowledgeGarden/angularclient Wiki
            //TAGO s | https://github.com/KnowledgeGarden/angularclient/wiki/Internal-API:-Creating-a-New-Topic
            // | Internal API: Creating a New Topic · KnowledgeGarden/angularclient Wiki
            //TAGO undefined | undefined | undefined
            $scope.stashNotes = "";
            if (undef !== id) {
                //This is a get view
                //TODO
            } else if (undef !== url) {
                //paint the common content
                $scope.$apply(function () {
                    $scope.pageTitle = title;
                    $scope.pageURL = url;
                });
            } else {
                //This is about indexes
            }

            $scope.saveStash = function() {
                console.log("Stashing "+$scope.stashNotes);
            };

            $scope.saveBookmark = function() {
                //TODO
            };

            $scope.listBookmarks = function() {
                console.log("Listing bookmarks");
                //TODO
            };

            $scope.listStashes = function() {
                console.log("Listing stashes");
                //TODO
            };
        }]);

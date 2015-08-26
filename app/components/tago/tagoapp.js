/**
 * Created by park on 7/25/2015.
 * BOOKMArk
 * javascript:location.href='http://<serverurl>/#/tago/bm?type=b&url='+
 *   encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)
 * STASH
 * javascript:location.href='http://localhost:8000/#/tago/stash?type=s&url='+
 *   encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title)
 */
'use strict';
/**
 * Create a Stashnode
 * @param title
 * @param url
 * @param note
 * @param userId
 * @param userIP
 * @param tmprovider
 * @param responseFunction signature(err, result) returns the JSON topicNode
 */
function newStash(title, url, note, userId, userIP, tmprovider, responseFunction) { //StashedResourceNodeType
    console.log("NewStash Function");
    tmprovider.submitNewInstanceTopic(null, StashedResourceNodeType, title, note, "en",
                   userId, "/images/bookmark.png", "/images/bookmark_sm.png", false, userIP, function(err, result) {
            return responseFunction(err, result);
        });
}

/**
 * Create a Bookmarknode
 * @param title
 * @param url
 * @param userId
 * @param userIP
 * @param tmprovider
 * @param responseFunction signature(err, result) returns the JSON topic node
 */
function newBookmark(title, url, userId, userIP, tmprovider, responseFunction) { //BookmarkNodeType
    console.log("NewBookmark Function");
    tmprovider.submitNewInstanceTopic(null, BookmarkNodeType, title, "", "en",
        userId, "/images/bookmark.png", "/images/bookmark_sm.png", false, userIP, function(err, result) {
            return responseFunction(err, result);
        });
}
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
            'tmprovider', 'tagprovider', 'constantsprovider', '$routeParams',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider,
                 tagprovider, constantsprovider, $routeParams) {
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
                //TODO $digest already in progress
                $scope.$apply(function () {
                    $scope.pageTitle = title;
                    $scope.pageURL = url;
                });
            } else {
                //This is about indexes
            }
            //VERB: stash
            $scope.saveStash = function() {
                console.log("Stashing "+$scope.stashNotes);
                newStash($scope.pageTitle, $scope.pageURL, $scope.stashNotes, $scope._userId, $scope._userIP,
                        tmprovider, function(err, result) {
                        ///TODO we are done
                        //redirect
                    });
            };
            // tags
            $scope.tag1 = "";
            $scope.tag2 = "";
            $scope.tag3 = "";
            $scope.tag4 = "";
            //VERB: newBookmark
            $scope.saveBookmark = function() {
                var tglist = [];
                if ($scope.tag1 !== "") {
                    tglist.push($scope.tag1);
                }
                if ($scope.tag2 !== "") {
                    tglist.push($scope.tag2);
                }
                if ($scope.tag3 !== "") {
                    tglist.push($scope.tag3);
                }
                if ($scope.tag4 !== "") {
                    tglist.push($scope.tag4);
                }

                var cargo = tagprovider.newBookmark($scope.pageTitle, $scope._userId);
                tmprovider._submitNewInstanceTopic(cargo, $scope._userId, $scope._userIP, $scope.sToken, function(err, result) {
                    var locator = result.lox;
                    console.log("SaveBkmk "+locator);
                    var cargo = {};
                    cargo.lox = locator;
                    cargo.crtr = $scope._userId;
                    cargo.url = $scope.pageURL;
                    if (tglist.length > 0) {
                        cargo.TagList = tglist;
                    }
                    tmprovider.addNodeFeatures(cargo, $scope._userId, $scope._userIP, $scope.sToken, function(err, result) {
                        return $window.location.href = '#/landing';
                    });
                });

            };


            var listInstances = function (nodeType, start, count) {
                //var ul = [];
                $scope.bmkList = [];
                console.log("List Users");
                tmprovider.listInstanceTopics(nodeType, start, count, $scope._userId, $scope._userIP, $scope.sToken, function (err, result) {
                    var theBM,
                        bm = {},
                        ul = [],
                        len = result.length;
                    console.log("LISTINSTANCES " + JSON.stringify(result));
                    for (var i = 0; i < len; i++) {
                        theBM = result[i];
                        bm = {};
                        bm.ico = constantsprovider.BOOKMARK_SM;
                        bm.lox = theBM.lox;
                        bm.label = theBM.label[0];
                        $scope.bmkList.push(usx);
                        console.log(JSON.stringify(bm)+" "+JSON.stringify($scope.bmkList));
                    }
                    $scope.$apply(function () {
                        $scope.bmkList = $scope.bmkList;
                        console.log("FOO " + JSON.stringify($scope.bmkList));
                    });
                });
            };



            $scope.listBookmarks = function() {
                console.log("Listing bookmarks");
                listInstances("BookmarkNodeType", 0, -1);
                return;
            };

            $scope.listStashes = function() {
                console.log("Listing stashes");
                //TODO

            };


        }]);

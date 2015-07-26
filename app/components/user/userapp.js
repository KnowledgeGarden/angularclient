/**
 * Created by Admin on 6/2/2015.
 */
'use strict';
angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'app/components/user/userindex.html',
            controller: 'UserCtrl'
        }).when('/user/view', {
            templateUrl: 'app/components/user/userview.html',
            controller: 'UserCtrl'
        });
    }])
    .controller('UserCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route', 'tmprovider',
        '$routeParams',
        function($scope, $window, $location, configService, $cookieStore, $route, tmprovider, $routeParams) {
            console.log("UserCtrl "+$routeParams.id);
            ////////////////////////
            // Set things up
            ////////////////////////
            var undef,
                fetchUserName = $routeParams.id;

            ////////////////////////
            // Now respond
            //   First, see if this was a link to a specific user
            ////////////////////////
            if (fetchUserName !== undef) {
                console.log("FETCHING USER "+fetchUserName);
                tmprovider.getTopic(fetchUserName, $scope._userId, $scope._userIP, function(err, result) {
                    console.log("GOT "+JSON.stringify(result));
                    $scope.$apply(function () {
                        $scope.user = result;

                    });
                });
            } else {
                $scope.userList = [];
                var listUsers = function (start, count) {
                    //var ul = [];

                    console.log("List Users");
                    tmprovider.listUsers(start, count, $scope._userId, $scope._userIP, function (err, result) {
                        var theUser,
                            usx = {},
                            ul = [],
                            len = result.length;
                        console.log("LISTUSERS " + JSON.stringify(result));
                        for (var i = 0; i < len; i++) {
                            theUser = result[i];
                            usx = {};
                            usx.uName = theUser.lox;
                            usx.fullName = theUser.label[0];
                            $scope.userList.push(usx);
                            console.log(JSON.stringify(usx)+" "+JSON.stringify($scope.userList));
                        }
                        $scope.$apply(function () {
                            $scope.userList = $scope.userList;
                            console.log("FOO " + JSON.stringify($scope.userList));
                        });
                    });
                };

                listUsers(0, -1);

            }
        }]);
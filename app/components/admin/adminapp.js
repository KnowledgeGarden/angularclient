/**
 * Created by park on 6/2/2015.
 */
'use strict';

/**
 * @see http://stackoverflow.com/questions/19343316/angularjs-and-cross-domain-post
 */
/**
 * @param query
 * @param callback  signature (error, response)
 */
function doPost(query, data, configService, callback) {

    var url = configService.server.backend+query+data;
    //TODO should not be adding data to url
    // but not sure where to find it during request
    console.log("XXX "+url);
    $.ajax({
        type: 'POST',
        url: url,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log("DOPOST SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("DOPOST ERROR");
            callback(responseData, null);
        }
    });
};

function make_base_auth(email, password) {
    var tok = email + ':' + password;
    var hash = btoa(tok);
    return 'Basic ' + hash;
};

function doAuthenticate(data, configService, callback) {

    var url = configService.server.backend+"auth/"+data;
    $.ajax({
        type: 'GET',
        url: url,
        crossDomain: true,
        dataType: 'json',
        success: function (responseData, textStatus, jqXHR) {
            console.log("AUTH SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("AUTH ERROR");
            callback(responseData, null);
        }
    });

};


/**
 * @param query a query string
 * @param callback signature (error, response)
 */
function doGet(query, configService, callback) {
    var url = configService.server.backend+query;
    console.log("XXX "+url);
    $.ajax({
        type: 'GET',
        url: url,
        crossDomain: true,
        dataType: 'json',
        success: function(responseData, textStatus, jqXHR) {
            console.log("DOGET SUCCESS");
            callback(null, responseData);
        },
        error: function (responseData, textStatus, errorThrown) {
            console.log("DOGET ERROR");
            callback(responseData, null);
        }
    });
};

function getCoreQuery(verb, userId, userIP, sToken) {
    var query = {};
    query.verb = verb;
    query.uIP = userIP;
    query.uName = userId;
    query.sToken = sToken;
    return query;
};


angular.module('myApp.admin', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'app/components/admin/admin.html',
            controller: 'AdminCtrl'
        })
        .when('/admin/login', {
            templateUrl: 'app/components/admin/login.html',
                controller: 'AdminCtrl'
        })
        //TODO catch /admin/authenticate/<data>
        .when('/admin/signup', {
            templateUrl: 'app/components/admin/signup.html',
                controller: 'AdminCtrl'
        })
        .when('/admin/profile', {
            templateUrl: 'app/components/admin/profile.html',
            controller: 'AdminCtrl'
        });
        //TODO there are more of them to add
    }])
    //This controller must process every action within the domain of admin
    // which includes signup, login, logout, and other admin functions
    // This system uses one page with shared displays.
    //   That means that we must use conditional display with booleans.
    //   Each verb below must shut off all other diisplays when turning its own on
    .controller('AdminCtrl', ['$scope', '$window', '$location', 'configService','$cookieStore', '$route', 'tmprovider',
        'nodeprovider', 'relationprovider',
                function($scope, $window, $location, configService, $cookieStore, $route, tmprovider,
                        nodeprovider, relationprovider) {

        ////////////////////////////////////
        // $location.search() allows us to detect query strings.
        //  example from validate: ?handle=<somename>
        ////////////////////////////////////
        var undef, // a way to detect undefined
            hquery = $location.search();
        $scope.invitationOnly = configService.needsInvite;
        console.log("ADM "+$scope.invitationOnly+" "+JSON.stringify(hquery));
        $scope.userlocator = "";
        var urx="",
            data="";
        $scope.message = "";
        $scope.left  = function() {return 100 - $scope.message.length;};
        $scope.clear = function() {$scope.message = "";};
        $scope.save  = function() {alert($scope.message);};
        //login
        $scope.email = "";
        $scope.password = "";
        //A Verb: Login
        $scope.login = function() {
            urx = 'auth/';
            var query = getCoreQuery("Auth", $scope._userId, $scope._userIP, $scope.sToken);
            var tok = $scope.email + ':' + $scope.password;
            var hash = btoa(tok);
            query.hash = hash;
            data=  JSON.stringify(query);
            console.log("FOO");
             doAuthenticate(data, configService, function(error, response) {
console.log("BAR "+response);
                if (response !== null) {
                    var tok = response.rToken;
                    var usx = response.cargo;
                    console.log(JSON.stringify(usx));
                    //TODO grab some data from usx into cookies for Profile
                    // must then grab those into $scopes in case Profile is selected
                    //An ADMIN looks like this
                    //{"uGeoloc":"","uEmail":"TempAdmin@foo.org","uHomepage":"","uName":"defaultadmi
                    //    n","uFullName":"Default Admin","uRole":"rar","uAvatar":""}
                    var tmp = usx.uRole;
                    if (tmp !== null) {
                        if (tmp.indexOf("rar") > -1) {
                            $scope.isAdmin = true;
                            $cookieStore.put('adminToken', 'T');
                        } else {
                            $scope.isAdmin = false;
                            $cookieStore.put('adminToken', 'F');
                        }
                    }
                    $cookieStore.put('sToken', tok);
                    $cookieStore.put('uName', usx.uName);
                    $window.location.href = '#/landing';
                    //NOTE: we are forced to refresh the page for the credentials to
                    // be recognized and switch Account menu from login to logout
                    return $window.location.reload();
                } else {
                    //ApplicationController.$scope.isAuthenticated = false;
                    //ApplicationController.$scope.isNotAuthenticated = true;
                    return alert("Incorrect Login");
                }
            });
        };

        $scope.logout = function() {
           // alert("LOGGING OUT "+$window);
            $cookieStore.put('sToken', '');
            $cookieStore.put('adminToken', "F");
            urx = 'auth/';
            var query = getCoreQuery("LogOut", $scope._userId, $scope._userIP, $scope.sToken);
            doGet(urx+JSON.stringify(query), configService, function(err, response) {
                $window.location.href = '#/landing';
                return $window.location.reload();
            });
        };

                //signup
        $scope.fullname = "";
        $scope.handle = "";
        //did we send in any info?

            if (hquery.handle !== undef) {
                $scope.handle = hquery.handle;
            } //else if (hquery.userlist !== undef) {
             //   console.log("foooo "+hquery.userlist);
             //   $scope.userList = JSON.parse(hquery.userlist);
           // }

        $scope.avatar = "";
        $scope.homepage = "";
        $scope.Latitude = "";
        $scope.Longitude = "";
        //validate
        $scope.vhandle = "";
        $scope.validate = function() {
            var uname= $scope.vhandle;
            urx='auth/';
            var query = getCoreQuery("Validate", uname, $scope._userIP, $scope.sToken);
            doGet(urx+JSON.stringify(query), configService, function(err, response) {
                //console.log($scope.vhandle+" | "+$scope.handle);
                //call the page again depending on situation
                if (response != null) {
                    //name already exists
                    return $window.location.href = '#/admin/signup';
                } else {
                    //name doesn't exist: use it
                    return $window.location.href = '#/admin/signup?handle='+$scope.vhandle;
                }
            });
        };
        //A Verb: Signup
        $scope.signup = function() {
            if ($scope.invitationOnly) {
                urx='admin/';
                var query = getCoreQuery("ExistsInvite", $scope._userId, $scope._userIP, $scope.sToken);
                query.uEmail=$scope.email;
                doGet(urx+JSON.stringify(query), configService, function(err, result) {
                    console.log("INVITE "+err+" "+result);
                    if (result != null) {
                        console.log("INVITE1 "+JSON.stringify(result));
                        urx = 'user/';
                        var query = getCoreQuery("NewUser", $scope._userId, $scope._userIP, $scope.sToken);
                        query.uEmail = $scope.email;
                        query.uName = $scope.handle;
                        query.uFullName = $scope.fullname;
                        query.uAvatar = $scope.avatar;
                        query.uPwd = btoa($scope.password);
                        query.uGeoloc = $scope.Latitude + "|" + $scope.Longitude;
                        query.uHomepage = encodeURI($scope.homepage);
                        //    alert($scope.fullname+" "+$scope.handle+" "+$scope.email+" "+btoa($scope.password));

                        data = JSON.stringify(query);
                        doPost(urx, data, configService, function (error, response) {
                            if (response !== null) {
                                //TODO do something with response.rToken
                                //Perhaps it will go in the header record under Authentication
                                return $window.location.href = '#/landing';
                            } else {
                                return alert("Signup Error " + JSON.stringify(error));
                            }
                        });
                    } else {
                        console.log("INVITE2 "+JSON.stringify(err));
                        return $window.location.href = '#/landing';
                    }
                });
            } else {
                console.log("INVITE3");
                urx = 'user/';
                var query = getCoreQuery("NewUser", $scope._userId, $scope._userIP, $scope.sToken);
                query.uIP = $scope._userIP;
                query.uEmail = $scope.email;
                query.uName = $scope._userId;
                query.uFullName = $scope.fullname;
                query.uAvatar = $scope.avatar;
                query.uPwd = btoa($scope.password);
                query.uGeoloc = $scope.Latitude + "|" + $scope.Longitude;
                query.uHomepage = encodeURI($scope.homepage);
                data = JSON.stringify(query);
                doPost(urx, data, configService, function (error, response) {
                    if (response !== null) {
                        //TODO do something with response.rToken
                        //Perhaps it will go in the header record under Authentication
                        return $window.location.href = '#/landing';
                    } else {
                        return alert("Signup Error " + JSON.stringify(error));
                    }
                });
            }
        };
         //list users

        $scope.listUsers = function() {
            urx = 'admin/';
            var query = getCoreQuery("ListUsers", $scope._userId, $scope._userIP, $scope.sToken);
            query.from= "0";
            query.count= "-1"; // list all of them
            doGet(urx+JSON.stringify(query), configService, function(error, response) {
                var ex = error;
                if (ex !== null)
                    ex = JSON.stringify(ex);
                var rx = response;
                if (rx !== null)
                    rx = JSON.stringify(rx);
               // alert(ex+" | "+rx);
                if (response != null) {
                    //$scope.$watch('tableParams', function (params) {
         //           $scope.dispList = true;
          //          $scope.testOk = false;
                    $scope.$apply(function () {
                        $scope.userList = response.cargo;
                        console.log("foooo "+JSON.stringify($scope.userList));
                    });
                  //  return $window.location.href = '#/admin';
                  //  return $route.reload();
                    //});
                }
            });
        };
        //user profile
        $scope.profile = function() {
            alert("profile");
        };
        //invitation
        $scope.invite = function() {
            urx = 'admin/';
            var query = getCoreQuery("NewInvite", $scope._userId, $scope._userIP, $scope.sToken);
            query.uEmail = $scope.iemail;
           doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
               return;
            });

        };
        $scope.removeInvite = function() {
            urx = 'admin/';
            var query = getCoreQuery("RemoveInvite", $scope._userId, $scope._userIP, $scope.sToken);
            query.uEmail = $scope.iemail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
                return;
            });

        };

        $scope.listInvites = function() {
            urx = 'admin/';
            var query = getCoreQuery("ListInvites", $scope._userId, $scope._userIP, $scope.sToken);
            query.from= "0";
            query.count= "-1"; // list all of them
            doGet(urx+JSON.stringify(query), configService, function(error, response) {
                var ex = error;
                if (ex !== null)
                    ex = JSON.stringify(ex);
                var rx = response;
                if (rx !== null)
                    rx = JSON.stringify(rx);
                // alert(ex+" | "+rx);
                if (response != null) {
                    //$scope.$watch('tableParams', function (params) {
                    //           $scope.dispList = true;
                    //          $scope.testOk = false;
                    $scope.inviteList = response.cargo;
                    console.log("foooo "+JSON.stringify($scope.inviteList));
                    //  return $window.location.href = '#/admin';
                    //  return $route.reload();
                    //});
                }
            });

        };
        $scope.uRole = "";
        $scope.huname = "";
        //getUserForRole
        // This is for the admin adding roles
        //TODO there is a possible collision among $scope.uRole if we were to
        // make $scope.uRole a global: maybe $scope._uRole for global?
        $scope.getUserForRole = function() {
            $scope.remail;
            urx = 'user/';
            var query = getCoreQuery("GetUser", $scope._userId, $scope._userIP, $scope.sToken);
            query.uEmail = $scope.remail;
            doGet(urx + JSON.stringify(query), configService, function (error, response) {
                if (response != null) {
                    $scope.$apply(function () {
                        console.log("GetUserForRole " + JSON.stringify(response.cargo));
                        $scope.uRole = response.cargo.uRole;
                        $scope.huname = response.cargo.uName;
                        $scope.uEmail = response.cargo.uEmail;
                    });
                }
                console.log("GUR "+$scope.uRole);
            });
        };
        //updateRole
        $scope.updateUserRole = function() {
            console.log("UPDATE "+$scope.huname+" "+$scope.uRole);
            urx = 'admin/';
            var query = getCoreQuery("UpdUsRol", $scope.huname, $scope._userIP, $scope.sToken);
            query.uRole = $scope.uRole;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };
        $scope.changeEmail = function() {
            console.log("UPDATE "+$scope.huname+" "+$scope.uEmail);
            urx = 'admin/';
            var query = getCoreQuery("UpdUsEma", $scope.huname, $scope._userIP, $scope.sToken);
            query.uEmail = $scope.uEmail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };
        $scope.changePassword = function() {
            $scope.oldpassword;
            $scope.newpassword;
            urx = 'admin/';
            var query = getCoreQuery("UpdUsPwd", $scope._userId, $scope._userIP, $scope.sToken);
            query.uPwd = $scope.oldpassword;
            query.uNewPwd = $scope.newpassword;
            query.uEmail = $scope.uEmail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };

        $scope.testTopic = function() {
            //locator, typeLocator, creatorId, label, details, language,
            //largeImagePath, smallImagePath, isPrivate
             /** tmprovider.getTopic("StashedResourceNodeType", $scope._userId, $scope._userIP, function (err, result) {
                console.log("HAH "+JSON.stringify(err)+" | "+JSON.stringify(result));
            });
          /**
            var topic = nm.newInstanceNode("AngTestClass3", "ClassType", "jackpark", "My test topic",
                "Created to test the AngularApp code", "en", "/images/cogwheel.png", "/images/cogwheel.sm.png", "F");
            console.log("TEST1 "+JSON.stringify(topic));
            //TEST1 {"Locator":"AngTestClass2","uName":"jackpark","Lang":"en","Label":"My test topic",
            // "Details":"Created to test the AngularApp code","LiP":"/images/cogwheel.png",
            // "SiP":"/images/cogwheel.sm.png","IsPvt":"F","SType":"ClassType"}
            tmprovider.submitNewSubclassTopic("AngTestClass4", "AngTestClass3", $scope._userId, "My test topic",
                "Created to test the AngularApp code", "en", "/images/cogwheel.png", "/images/cogwheel.sm.png", "F",
                $scope._userIP, function(err, result) {
                console.log("HAH "+err+" | "+JSON.stringify(result));
                //HAH null | {"rMsg":"ok","rToken":"","cargo":{"crDt":"2015-07-25T18:54:17-07:00","trCl":["ClassType"],"crtr":"jackpark",
                // "lox":"AngTestClass2","sIco":"/images/cogwheel.sm.png","isPrv":"false","_ver":"1437875657385",
                // "lEdDt":"2015-07-25T18:54:17-07:00","details":["Created to test the AngularApp code"],
                // "label":["My test topic"],"lIco":"/images/cogwheel.png","inOf":"ClassType"}}
                //HAH null | {"rMsg":"ok","rToken":"","cargo":{"crDt":"2015-07-26T13:22:11-07:00","trCl":["ClassType","AngTestClass3"],
                // "crtr":"jackpark","sbOf":["AngTestClass3"],"lox":"AngTestClass4","sIco":"/images/cogwheel.sm.png",
                // "isPrv":"false","_ver":"1437942131725","lEdDt":"2015-07-26T13:22:11-07:00",
                // "details":["Created to test the AngularApp code"],"label":["My test topic"],"lIco":"/images/cogwheel.png"}}
            }); */
        }
    }]);


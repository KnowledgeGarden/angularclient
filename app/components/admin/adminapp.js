/**
 * Created by Admin on 6/2/2015.
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
                    tmprovider.init(configService, nodeprovider, relationprovider);
                    tmprovider.test('Admin');
        var userIP = "";

        getIp(function(err, response) {
            if (response !== null) {
                console.log("IP "+response.ip);
                userIP = response.ip;
            }
        })
        $scope.isAdmin = false;
        $scope.isAuthenticated = false;
        $scope.isNotAuthenticated = true;
        var undef;
        var tok = $cookieStore.get('sToken');
        console.log("A "+(tok == undef));
        var truth = (tok !== undef && tok !== '');
        console.log("AC "+tok+" "+truth);
        if (truth) {
            $scope.isAuthenticated = true;
            $scope.isNotAuthenticated = false;
            tok = $cookieStore.get('adminToken');
            if (tok !== undef && tok === 'T') {
                $scope.isAdmin = true;
            } else {
                $scope.isAdmin = false;
            }
        } else {
            $scope.isAuthenticated = false;
            $scope.isNotAuthenticated = true;
            $scope.isAdmin = false;
        }
        ////////////////////////////////////
        // $location.search() allows us to detect query strings.
        //  example from validate: ?handle=<somename>
        ////////////////////////////////////
        var undef, // a way to detect undefined
            hquery = $location.search();
        $scope.invitationOnly = configService.needsInvite;
        console.log("ADM "+$scope.invitationOnly+" "+JSON.stringify(hquery));
        $scope.userlocator = "";
        var query = {},
            urx="",
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
            query.verb = "Auth";
            query.uIP = userIP;
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

                    $window.location.href = '#/landing';
                    return $window.location.reload();
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
            query.verb="Validate";
            query.uIP = userIP;
            query.uName=uname;
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
                query.verb='ExistsInvite';
                query.uIP = userIP;
                query.uEmail=$scope.email;
                doGet(urx+JSON.stringify(query), configService, function(err, result) {
                    console.log("INVITE "+err+" "+result);
                    if (result != null) {
                        console.log("INVITE1 "+JSON.stringify(result));
                        urx = 'user/';
                        query.verb = "NewUser";
                        query.uIP = userIP;
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
                query.verb = "NewUser";
                query.uIP = userIP;
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
            }
        };
         //list users

        $scope.listUsers = function() {
            urx = 'admin/';
            query.verb= "ListUsers";
            query.uIP = userIP;
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
            query.verb = "NewInvite";
            query.uIP = userIP;
            query.uEmail = $scope.iemail;
           doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
               return;
            });

        };
        $scope.removeInvite = function() {
            urx = 'admin/';
            query.verb = "RemoveInvite";
            query.uIP = userIP;
            query.uEmail = $scope.iemail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
                return;
            });

        };

        $scope.listInvites = function() {
            urx = 'admin/';
            query.verb= "ListInvites";
            query.uIP = userIP;
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
        $scope.getUserForRole = function() {
            $scope.remail;
            urx = 'user/';
            query.verb = "GetUser";
            query.uIP = userIP;
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
            query.verb = "UpdUsRol";
            query.uIP = userIP;
            query.uName = $scope.huname;
            query.uRole = $scope.uRole;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };
        $scope.changeEmail = function() {
            console.log("UPDATE "+$scope.huname+" "+$scope.uEmail);
            urx = 'admin/';
            query.verb = "UpdUsEma";
            query.uIP = userIP;
            query.uName = $scope.huname;
            query.uEmail = $scope.uEmail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };
        $scope.changePassword = function() {
            $scope.oldpassword;
            $scope.newpassword;
            urx = 'admin/';
            query.verb = "UpdUsPwd";
            query.uIP = userIP;
            query.uPwd = $scope.oldpassword;
            query.uNewPwd = $scope.newpassword;
            query.uEmail = $scope.uEmail;
            doPost(urx, JSON.stringify(query), configService, function(err, response) {
                //TODO watch for errors
            });
        };
    }]);


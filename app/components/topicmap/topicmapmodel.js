/**
 * Created by park on 7/21/2015.
 * A model which provides a TopicMap API for other apps
 * This model is initialized in AdminApp which is the first app to fire
 * on every view. It is then available to any app which needs topic map
 * services.
 */
//TODO: Wire this puppy to do something useful
///////////////////////////////
// Network support
///////////////////////////////
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

///////////////////////////////
// TopicMapModel
///////////////////////////////

var TopicMapModel;
TopicMapModel = function () {
    var configService = null,
        nodeModel = null,
        relationModel = null,
        self = this;

    console.log("TopicMapModel ");

    /**
     * Must be called on boot -- by adminapp
     */
    self.init = function (configurizer, nodeprovider, relationprovider) {
        if (configService === null) {
            configService = configurizer;
            nodeModel = nodeprovider;
            relationModel = relationprovider;
            console.log("TopicMap config " + configService + " " + nodeModel + " " + relationModel);
        }
    };

    self.test = function (who) {
        console.log("Hello from " + who);
    };

    self.getNodeModel = function () {
        return nodeModel;
    };

    self.getRelationModel = function () {
        return relationModel;
    };

    self.getCoreQuery = function(verb, userId, userIP) {
        var query = {};
        query.verb = verb;
        query.uIP = userIP;
        query.uName = userId;
        return query;
    };
    /**
     * Fetch a list of user topics
     * @param start
     * @param count
     * @param userId
     * @param userIP
     * @param responseFunction signature( a list of users or <code>null</code>
     */
    self.listUsers = function (start, count, userId, userIP, responseFunction) {
        var result = [],
            query = self.getCoreQuery('ListUsers', userId, userIP);
            urx = 'tm/';
        query.from = '0';
        query.count = '-1';
        doGet(urx + JSON.stringify(query), configService, function (err, response) {
            console.log("ListUsers " + err + " | " + response);
            if (response != null) {
                var cargo = response.cargo;
                console.log(JSON.stringify(cargo));
                result = cargo;
                //[{"crDt":"2015-07-23T12:48:26-07:00","trCl":["UserType"],"crtr":"SystemUser","lox":"jackpark","sIco":"/images/person_sm.png","isPrv":"false","_ver":"1437680906846",
                // "lEdDt":"2015-07-23T12:48:26-07:00","details":[""],"label":["Jack Park"],"lIco":"/images/person.png","inOf":"UserType"}]
            }
            return responseFunction(result);
        });
    };

    self.getTopic = function(locator, userId, userIP, responseFunction) {
        var result = {},
            query = self.getCoreQuery('GetTopic', userId, userIP);
        urx = 'tm/';
        query.Locator = locator;
        query.uIP = userIP;
        doGet(urx + JSON.stringify(query), configService, function (err, response) {
            console.log("ListUsers " + err + " | " + response);
            if (response != null) {
                var cargo = response.cargo;
                console.log(JSON.stringify(cargo));
                result = cargo;
            }
            return responseFunction(result);
        });
    };

};

var myModel = null;
angular.module('TopicMapProvider',[])
    .service('tmprovider', function() {
        if (myModel === null) {
            myModel = new TopicMapModel();
        }
        return myModel;
    });